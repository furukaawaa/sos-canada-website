'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function NewProcessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    visaType: '',
    notes: '',
  });

  const countries = [
    'Canadá',
    'Estados Unidos',
    'Reino Unido',
    'Austrália',
    'Nova Zelândia',
    'França',
    'Alemanha',
    'Itália',
    'Espanha',
    'Portugal',
    'Japão',
    'China',
    'Outros',
  ];

  const visaTypes = {
    'Canadá': [
      'Turismo',
      'Estudos até 6 meses',
      'Estudos acima de 6 meses',
      'Trabalho',
      'Negócios',
      'eTA',
      'OWP - Open Work Permit',
      'IEC - International Experience Canada',
    ],
    'Estados Unidos': [
      'B1/B2 - Turismo e Negócios',
      'F1 - Estudante',
      'H1B - Trabalho',
      'J1 - Intercâmbio',
      'L1 - Transferência',
    ],
    'default': [
      'Turismo',
      'Estudos',
      'Trabalho',
      'Negócios',
      'Residência',
    ],
  };

  const getVisaTypes = () => {
    if (formData.country in visaTypes) {
      return visaTypes[formData.country as keyof typeof visaTypes];
    }
    return visaTypes.default;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/visa-processes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar processo');
      }

      setSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar processo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-blue-600" />
            Novo Processo de Visto
          </h1>
          <p className="text-gray-600 mt-2">
            Inicie seu processo de solicitação de visto
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">
                      Processo criado com sucesso!
                    </h3>
                    <p className="text-green-800">
                      Você será redirecionado para o dashboard...
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
              <CardTitle>Informações do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    País de Destino *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value, visaType: '' })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Selecione um país</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.country && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tipo de Visto *
                    </label>
                    <select
                      value={formData.visaType}
                      onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Selecione o tipo de visto</option>
                      {getVisaTypes().map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Observações
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Informações adicionais sobre sua viagem, propósito, datas, etc."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Criando...' : 'Criar Processo'}
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  * Campos obrigatórios
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-blue-900 mb-3">ℹ️ Próximos Passos</h3>
              <ol className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span>Após criar o processo, nossa equipe irá analisá-lo</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span>Você receberá um e-mail com a lista de documentos necessários</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span>Acompanhe o status do processo pelo dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <span>Nossa equipe entrará em contato em até 24 horas úteis</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
