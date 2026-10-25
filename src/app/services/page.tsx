'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe, 
  Plane, 
  GraduationCap, 
  Briefcase, 
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesPage() {
  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Visto Canadense',
      description: 'Assessoria completa para todos os tipos de vistos para o Canadá',
      features: [
        'Turismo e Estudos até 6 meses',
        'Estudos acima de 6 meses',
        'Trabalho e OWP',
        'eTA - Electronic Travel Authorization',
        'IEC - International Experience',
        'Extensão de Permanência',
      ],
      color: 'from-red-500 to-red-700',
      link: '/consultation',
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: 'Visto Americano',
      description: 'Suporte especializado para vistos dos Estados Unidos',
      features: [
        'B1/B2 - Turismo e Negócios',
        'F1 - Visto de Estudante',
        'H1B - Visto de Trabalho',
        'J1 - Visto de Intercâmbio',
        'Renovação sem entrevista',
        'ESTA - Autorização Eletrônica',
      ],
      color: 'from-blue-500 to-blue-700',
      link: '/consultation',
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Vistos de Estudos',
      description: 'Realize seu sonho de estudar no exterior',
      features: [
        'Análise de perfil acadêmico',
        'Orientação de documentos',
        'Carta de intenção',
        'Preparação para entrevista',
        'Study Permit',
        'Visto de dependente',
      ],
      color: 'from-purple-500 to-purple-700',
      link: '/consultation',
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: 'Vistos de Trabalho',
      description: 'Oportunidades profissionais internacionais',
      features: [
        'Análise de elegibilidade',
        'Documentação trabalhista',
        'Carta de oferta de emprego',
        'Work Permit',
        'Visto de transferência',
        'Visto de empreendedor',
      ],
      color: 'from-green-500 to-green-700',
      link: '/consultation',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Outros Países',
      description: 'Vistos para Europa, Ásia, Oceania e mais',
      features: [
        'Reino Unido',
        'Austrália e Nova Zelândia',
        'Países Europeus (Schengen)',
        'Japão e China',
        'Portugal e Espanha',
        'Outros destinos',
      ],
      color: 'from-orange-500 to-orange-700',
      link: '/consultation',
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: 'Serviços Adicionais',
      description: 'Suporte completo para sua jornada',
      features: [
        'Tradução juramentada',
        'Apostilamento de documentos',
        'Seguro viagem',
        'Passaporte de emergência',
        'Análise de recusa',
        'Consultoria migratória',
      ],
      color: 'from-pink-500 to-pink-700',
      link: '/consultation',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consulta Inicial',
      description: 'Análise gratuita do seu perfil e objetivos',
    },
    {
      number: '02',
      title: 'Documentação',
      description: 'Orientação sobre documentos necessários',
    },
    {
      number: '03',
      title: 'Formulários',
      description: 'Preenchimento e revisão completa',
    },
    {
      number: '04',
      title: 'Preparação',
      description: 'Treinamento para entrevista (quando aplicável)',
    },
    {
      number: '05',
      title: 'Acompanhamento',
      description: 'Suporte durante todo o processo',
    },
    {
      number: '06',
      title: 'Aprovação',
      description: 'Celebre conosco seu visto aprovado!',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/services-background.jpg)',
              filter: 'blur(2px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-blue-900/85 to-red-900/90" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Assessoria completa para todos os tipos de vistos e documentação internacional.
              Mais de 22 anos de experiência e 95% de aprovação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.link}>
                      <Button className="w-full">
                        Solicitar Agora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples e transparente em 6 etapas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-blue-600 mb-4 opacity-20">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-700 via-blue-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Entre em contato conosco e dê o primeiro passo rumo ao seu destino
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl">
                  Agendar Consulta Gratuita
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
