'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [processesRes, consultationsRes] = await Promise.all([
        fetch('/api/visa-processes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }),
        fetch('/api/consultations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      ]);

      if (processesRes.ok) {
        const processesData = await processesRes.json();
        setProcesses(processesData.processes || []);
      }

      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json();
        setConsultations(consultationsData.consultations || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: 'Processos Ativos',
      value: processes.filter(p => p.status !== 'completed').length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Aprovados',
      value: processes.filter(p => p.status === 'approved').length,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Em Análise',
      value: processes.filter(p => p.status === 'in_progress').length,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Consultas',
      value: consultations.length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Acompanhe seus processos e consultas
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className={`${stat.color} text-white p-3 rounded-lg mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Processes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Meus Processos</h2>
            <Link href="/dashboard/new-process">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Processo
              </Button>
            </Link>
          </div>

          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">Carregando...</p>
              </CardContent>
            </Card>
          ) : processes.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Você ainda não tem processos</p>
                <Link href="/dashboard/new-process">
                  <Button>Criar Primeiro Processo</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {processes.map((process) => (
                <Card key={process.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-bold mr-3">
                            {process.country} - {process.visaType}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(process.status)}`}>
                            {getStatusLabel(process.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Processo: {process.processNumber}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Criado em: {formatDate(process.createdAt)}
                        </p>
                      </div>
                      <Link href={`/dashboard/process/${process.id}`}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Consultations Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Minhas Consultas</h2>
            <Link href="/consultation">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </Link>
          </div>

          {consultations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Você ainda não tem consultas agendadas</p>
                <Link href="/consultation">
                  <Button>Agendar Consulta</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{consultation.service}</h3>
                        {consultation.country && (
                          <p className="text-gray-600 text-sm mb-2">País: {consultation.country}</p>
                        )}
                        <p className="text-gray-500 text-sm">
                          Solicitado em: {formatDate(consultation.createdAt)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                        {getStatusLabel(consultation.status)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
