'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Globe, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Importar o mapa dinamicamente para evitar SSR
const MapComponent = dynamic(() => import('@/components/map'), { ssr: false });

export default function AirportsPage() {
  const [airports, setAirports] = useState<any[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await fetch('/api/airports?featured=true');
      const data = await response.json();
      setAirports(data.airports || []);
      if (data.airports && data.airports.length > 0) {
        setSelectedAirport(data.airports[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar aeroportos:', error);
    } finally {
      setLoading(false);
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
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Principais Aeroportos
          </h1>
          <p className="text-xl text-gray-600">
            Localize e obtenha informações sobre os aeroportos mais importantes
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando aeroportos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Airport List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Aeroportos</h2>
              {airports.map((airport, index) => (
                <motion.div
                  key={airport.code || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    hover
                    className={`cursor-pointer transition-all ${
                      selectedAirport?.code === airport.code
                        ? 'ring-2 ring-blue-600 shadow-lg'
                        : ''
                    }`}
                    onClick={() => setSelectedAirport(airport)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-bold text-sm mr-3">
                          {airport.code}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {airport.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {airport.city}, {airport.country}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[600px] rounded-lg overflow-hidden">
                      <MapComponent
                        airports={airports}
                        selectedAirport={selectedAirport}
                        onSelectAirport={setSelectedAirport}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Selected Airport Info */}
                {selectedAirport && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="bg-white/20 text-white px-3 py-1 rounded-lg font-bold text-sm inline-block mb-3">
                              {selectedAirport.code}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                              {selectedAirport.name}
                            </h3>
                            <p className="text-blue-100 flex items-center mb-4">
                              <MapPin className="w-4 h-4 mr-2" />
                              {selectedAirport.city}, {selectedAirport.country}
                            </p>
                            {selectedAirport.latitude && selectedAirport.longitude && (
                              <p className="text-blue-100 flex items-center text-sm">
                                <Navigation className="w-4 h-4 mr-2" />
                                {selectedAirport.latitude}, {selectedAirport.longitude}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">
                🗺️ Como usar este mapa
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clique em um aeroporto da lista para visualizá-lo no mapa</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Use o zoom (+/-) para aproximar ou afastar a visualização</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Arraste o mapa para explorar diferentes regiões</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>As coordenadas exatas são exibidas ao selecionar um aeroporto</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
