'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, RefreshCw, Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState('GRU');
  const [isMock, setIsMock] = useState(false);

  const airports = [
    { code: 'GRU', name: 'São Paulo - Guarulhos' },
    { code: 'GIG', name: 'Rio de Janeiro - Galeão' },
    { code: 'BSB', name: 'Brasília' },
    { code: 'CGH', name: 'São Paulo - Congonhas' },
  ];

  useEffect(() => {
    fetchFlights();
  }, [selectedAirport]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/flights?airport=${selectedAirport}`);
      const data = await response.json();
      setFlights(data.flights || []);
      setIsMock(data.mock || false);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'No Horário';
      case 'delayed':
        return 'Atrasado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voos em Tempo Real
          </h1>
          <p className="text-xl text-gray-600">
            Acompanhe partidas e chegadas dos principais aeroportos
          </p>
          {isMock && (
            <div className="mt-4 inline-block bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm">
              ℹ️ Exibindo dados de demonstração
            </div>
          )}
        </motion.div>

        {/* Airport Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selecione o Aeroporto
                  </label>
                  <select
                    value={selectedAirport}
                    onChange={(e) => setSelectedAirport(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-auto md:mt-6">
                  <Button onClick={fetchFlights} disabled={loading} className="w-full md:w-auto">
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Atualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flights List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando voos...</p>
          </div>
        ) : flights.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum voo encontrado</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {flights.map((flight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold text-sm">
                            {flight.flight_number || 'N/A'}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(flight.flight_status)}`}>
                            {getStatusLabel(flight.flight_status)}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          {flight.airline || 'Companhia Aérea'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>
                              Destino: {flight.arrival?.city || flight.arrival?.airport || 'N/A'}
                            </span>
                          </div>
                          {flight.departure?.terminal && (
                            <div className="flex items-center text-gray-600">
                              <span className="mr-2">✈️</span>
                              Terminal {flight.departure.terminal}
                              {flight.departure.gate && ` - Portão ${flight.departure.gate}`}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Time Info */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-lg font-bold">
                            {formatTime(flight.departure?.scheduled || new Date().toISOString())}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {formatDate(flight.departure?.scheduled || new Date().toISOString())}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-blue-900 mb-2">ℹ️ Informações Importantes</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Os horários são exibidos no fuso horário local</li>
                <li>• Recomendamos chegar ao aeroporto com 3 horas de antecedência para voos internacionais</li>
                <li>• Confira sempre seu terminal e portão de embarque</li>
                <li>• Para voos internacionais, não esqueça de conferir a documentação necessária</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
