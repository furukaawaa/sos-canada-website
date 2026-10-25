/**
 * ============================================
 * GET /api/flights?airport=GRU
 * ============================================
 * Consulta voos em tempo real via AviationStack API.
 *
 * Se AVIATION_API_KEY não estiver configurada no .env,
 * retorna dados de demonstração (mock) automaticamente.
 *
 * Query params:
 *   - airport: código IATA (default: GRU)
 *   - type: departures | arrivals
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const airport = searchParams.get('airport') || 'GRU';
  const type = searchParams.get('type') || 'departures';

  const apiKey = process.env.AVIATION_API_KEY;

  // Sem API key → retorna dados mock de demonstração
  if (!apiKey) {
    return NextResponse.json({
      flights: getMockFlights(airport, type),
      mock: true,
    });
  }

  try {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${airport}&limit=20`;
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json({
      flights: data.data || [],
      mock: false,
    });
  } catch (error) {
    console.error('Erro ao buscar voos:', error);
    // Fallback para mock em caso de falha na API externa
    return NextResponse.json({
      flights: getMockFlights(airport, type),
      mock: true,
    });
  }
}

/**
 * Gera voos de demonstração para desenvolvimento/testes.
 * Simula partidas do aeroporto especificado.
 */
function getMockFlights(airport: string, type: string) {
  const now = new Date();
  const flights = [];

  const destinations = [
    { code: 'YYZ', city: 'Toronto', airline: 'Air Canada' },
    { code: 'JFK', city: 'Nova York', airline: 'LATAM' },
    { code: 'CDG', city: 'Paris', airline: 'Air France' },
    { code: 'LHR', city: 'Londres', airline: 'British Airways' },
    { code: 'YVR', city: 'Vancouver', airline: 'Air Canada' },
    { code: 'LAX', city: 'Los Angeles', airline: 'United Airlines' },
    { code: 'MIA', city: 'Miami', airline: 'American Airlines' },
    { code: 'EZE', city: 'Buenos Aires', airline: 'Aerolíneas Argentinas' },
    { code: 'LIS', city: 'Lisboa', airline: 'TAP Portugal' },
    { code: 'AMS', city: 'Amsterdam', airline: 'KLM' },
  ];

  for (let i = 0; i < 10; i++) {
    const dest = destinations[i];
    // Partidas espaçadas a cada 90 minutos
    const departureTime = new Date(now.getTime() + (i * 90 * 60000));
    // Duração simulada de 8 horas de voo
    const arrivalTime = new Date(departureTime.getTime() + (8 * 60 * 60000));

    flights.push({
      flight_number: `${dest.airline.substring(0, 2).toUpperCase()}${100 + i}`,
      airline: dest.airline,
      departure: {
        airport: airport,
        scheduled: departureTime.toISOString(),
        terminal: Math.floor(Math.random() * 3) + 1,
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 20) + 1}`,
      },
      arrival: {
        airport: dest.code,
        city: dest.city,
        scheduled: arrivalTime.toISOString(),
      },
      // 20% de chance de atraso para simulação realista
      flight_status: Math.random() > 0.8 ? 'delayed' : 'scheduled',
    });
  }

  return flights;
}
