/**
 * ============================================
 * GET/POST /api/airports
 * ============================================
 * GET: aeroportos para o mapa (com fallback padrão). POST: cadastra aeroporto.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { airports } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    let airportsList;

    if (featured === 'true') {
      airportsList = await db.select()
        .from(airports)
        .where(eq(airports.featured, true));
    } else {
      airportsList = await db.select().from(airports);
    }

    // Se não houver aeroportos, retornar lista padrão
    if (airportsList.length === 0) {
      return NextResponse.json({
        airports: getDefaultAirports(),
        default: true,
      });
    }

    return NextResponse.json({ airports: airportsList });
  } catch (error) {
    console.error('Erro ao buscar aeroportos:', error);
    return NextResponse.json({
      airports: getDefaultAirports(),
      default: true,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, name, city, country, latitude, longitude, featured } = body;

    const [airport] = await db.insert(airports).values({
      code,
      name,
      city,
      country,
      latitude,
      longitude,
      featured: featured || false,
    }).returning();

    return NextResponse.json({ airport });
  } catch (error) {
    console.error('Erro ao criar aeroporto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar aeroporto' },
      { status: 500 }
    );
  }
}

function getDefaultAirports() {
  return [
    {
      code: 'GRU',
      name: 'Aeroporto Internacional de São Paulo/Guarulhos',
      city: 'São Paulo',
      country: 'Brasil',
      latitude: '-23.432075',
      longitude: '-46.469511',
      featured: true,
    },
    {
      code: 'YYZ',
      name: 'Toronto Pearson International Airport',
      city: 'Toronto',
      country: 'Canadá',
      latitude: '43.677223',
      longitude: '-79.630556',
      featured: true,
    },
    {
      code: 'YVR',
      name: 'Vancouver International Airport',
      city: 'Vancouver',
      country: 'Canadá',
      latitude: '49.193889',
      longitude: '-123.184444',
      featured: true,
    },
    {
      code: 'JFK',
      name: 'John F. Kennedy International Airport',
      city: 'Nova York',
      country: 'Estados Unidos',
      latitude: '40.641766',
      longitude: '-73.780968',
      featured: true,
    },
    {
      code: 'LAX',
      name: 'Los Angeles International Airport',
      city: 'Los Angeles',
      country: 'Estados Unidos',
      latitude: '33.942536',
      longitude: '-118.408075',
      featured: true,
    },
    {
      code: 'LHR',
      name: 'London Heathrow Airport',
      city: 'Londres',
      country: 'Reino Unido',
      latitude: '51.470020',
      longitude: '-0.454295',
      featured: true,
    },
  ];
}
