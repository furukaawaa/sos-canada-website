'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConsultationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    country: '',
    message: '',
  });

  const services = [
    'Visto Canadense - Turismo',
    'Visto Canadense - Estudos',
    'Visto Canadense - Trabalho',
    'Visto Americano - Turismo',
    'Visto Americano - Estudos',
    'Visto Americano - Trabalho',
    'Visto Europeu',
    'Visto Australiano',
    'Outros Serviços',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao agendar consulta');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        country: '',
        message: '',
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao agendar consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agendar Consulta
          </h1>
          <p className="text-xl text-gray-600">
            Preencha o formulário e entraremos em contato em breve
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">
                      Consulta agendada com sucesso!
                    </h3>
                    <p className="text-green-800">
                      Recebemos sua solicitação e entraremos em contato em breve para
                      confirmar o agendamento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    label="Nome Completo *"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <Input
                    type="email"
                    label="Email *"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="tel"
                    label="Telefone *"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <Input
                    type="text"
                    label="País de Destino"
                    placeholder="Ex: Canadá, EUA..."
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Serviço Desejado *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte-nos mais sobre suas necessidades..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? 'Enviando...' : 'Agendar Consulta'}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  * Campos obrigatórios
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold mb-2">Resposta Rápida</h3>
              <p className="text-sm text-gray-600">
                Retornamos em até 24 horas
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-2">Análise Gratuita</h3>
              <p className="text-sm text-gray-600">
                Avaliação inicial sem custo
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-bold mb-2">95% Aprovação</h3>
              <p className="text-sm text-gray-600">
                Alta taxa de sucesso
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
