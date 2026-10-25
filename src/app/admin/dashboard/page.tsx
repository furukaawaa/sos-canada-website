'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string } | null>(null);
  const [stats, setStats] = useState({
    totalProcesses: 0,
    pendingProcesses: 0,
    approvedProcesses: 0,
    totalConsultations: 0,
  });
  const [recentProcesses, setRecentProcesses] = useState<any[]>([]);
  const [recentConsultations, setRecentConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');

    if (!token || !adminData) {
      router.push('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminData));
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [processesRes, consultationsRes] = await Promise.all([
        fetch('/api/visa-processes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }),
        fetch('/api/consultations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }),
      ]);

      if (processesRes.ok) {
        const processesData = await processesRes.json();
        const processes = processesData.processes || [];
        setRecentProcesses(processes.slice(0, 5));
        setStats(prev => ({
          ...prev,
          totalProcesses: processes.length,
          pendingProcesses: processes.filter((p: any) => p.status === 'pending').length,
          approvedProcesses: processes.filter((p: any) => p.status === 'approved').length,
        }));
      }

      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json();
        const consultations = consultationsData.consultations || [];
        setRecentConsultations(consultations.slice(0, 5));
        setStats(prev => ({
          ...prev,
          totalConsultations: consultations.length,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!admin) {
    return null;
  }

  const statsCards = [
    {
      title: 'Total de Processos',
      value: stats.totalProcesses,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500',
      trend: '+12% este mês',
    },
    {
      title: 'Processos Pendentes',
      value: stats.pendingProcesses,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-500',
      trend: 'Requer atenção',
    },
    {
      title: 'Aprovados',
      value: stats.approvedProcesses,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      trend: '95% taxa de sucesso',
    },
    {
      title: 'Consultas',
      value: stats.totalConsultations,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-purple-500',
      trend: '+8% esta semana',
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-blue-600" />
                Painel Administrativo
              </h1>
              <p className="text-gray-600 mt-2">
                Bem-vindo, {admin.name} ({admin.role})
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} text-white p-3 rounded-lg`}>
                      {stat.icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.trend}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Processes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Processos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-gray-600 py-8">Carregando...</p>
              ) : recentProcesses.length === 0 ? (
                <p className="text-center text-gray-600 py-8">Nenhum processo encontrado</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Processo
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          País
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Tipo
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProcesses.map((process) => (
                        <tr key={process.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">
                            {process.processNumber}
                          </td>
                          <td className="py-3 px-4 text-sm">{process.country}</td>
                          <td className="py-3 px-4 text-sm">{process.visaType}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                              {getStatusLabel(process.status)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {formatDate(process.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Consultations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Consultas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-gray-600 py-8">Carregando...</p>
              ) : recentConsultations.length === 0 ? (
                <p className="text-center text-gray-600 py-8">Nenhuma consulta encontrada</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Nome
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Serviço
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentConsultations.map((consultation) => (
                        <tr key={consultation.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">
                            {consultation.name}
                          </td>
                          <td className="py-3 px-4 text-sm">{consultation.email}</td>
                          <td className="py-3 px-4 text-sm">{consultation.service}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                              {getStatusLabel(consultation.status)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {formatDate(consultation.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
