'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Shield, 
  Users, 
  Award, 
  Globe, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  MapPin,
  Calendar,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [stats, setStats] = useState({
    visasApproved: 0,
    clients: 0,
    countries: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    // Animação dos números
    const interval = setInterval(() => {
      setStats(prev => ({
        visasApproved: prev.visasApproved < 95 ? prev.visasApproved + 1 : 95,
        clients: prev.clients < 10000 ? prev.clients + 100 : 10000,
        countries: prev.countries < 50 ? prev.countries + 1 : 50,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 1 : 98,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Visto Canadense',
      description: 'Assessoria completa para todos os tipos de vistos para o Canadá',
      link: '/services',
      gradient: 'from-red-500 to-red-700',
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Visto Americano',
      description: 'Suporte especializado para vistos dos Estados Unidos',
      link: '/services',
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Outros Países',
      description: 'Vistos para Europa, Ásia, Oceania e mais',
      link: '/services',
      gradient: 'from-red-600 to-blue-600',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Agendamento',
      description: 'Agende sua consulta personalizada',
      link: '/consultation',
      gradient: 'from-blue-700 to-red-700',
    },
  ];

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certificação ISO 9001:2015',
      description: 'Processos auditados e certificados',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Equipe Especializada',
      description: 'Mais de 93 colaboradores dedicados',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Segurança Total',
      description: 'Seus dados protegidos com criptografia',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Acompanhamento 24/7',
      description: 'Suporte completo durante todo o processo',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      rating: 5,
      comment: 'Excelente atendimento! Consegui meu visto canadense sem complicações.',
      service: 'Visto Canadense',
    },
    {
      name: 'João Santos',
      rating: 5,
      comment: 'Profissionais muito competentes. Recomendo a todos!',
      service: 'Visto Americano',
    },
    {
      name: 'Ana Paula',
      rating: 5,
      comment: 'Processo rápido e transparente. Muito satisfeita com o resultado.',
      service: 'Visto de Estudos',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/hero-background.jpg)',
              filter: 'blur(3px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/85 via-blue-900/80 to-red-800/85" />
        </div>
        
        {/* Floating Logos */}
        <div className="absolute top-8 right-8 z-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20"
          >
            <Image 
              src="/logo-sos-canada.png" 
              alt="S.O.S Canadá" 
              width={200} 
              height={80}
              className="h-16 w-auto"
            />
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 hidden xl:block">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl opacity-20"
          >
            ✈️
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 right-20 hidden xl:block">
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="text-6xl opacity-20"
          >
            🌍
          </motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <span className="bg-white/15 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-semibold border border-white/30 shadow-xl inline-flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certificação ISO 9001:2015 · 95% de Aprovação
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-[1.05] tracking-tight">
              Seu visto aprovado.
              <br />
              <span className="bg-gradient-to-r from-red-400 via-white to-blue-300 bg-clip-text text-transparent">
                Sua viagem garantida.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 font-medium text-white/90 drop-shadow-lg">
              S.O.S Canadá & Mundo dos Vistos — a assessoria mais premiada do Brasil
            </p>
            <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-white/95 drop-shadow-md">
              Com mais de 22 anos de experiência, certificação ISO 9001 e 95% de aprovação,
              transformamos seu sonho de viajar em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
                  Criar Conta
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 shadow-xl transition-all duration-300">
                  Agendar Consulta
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.visasApproved}%</div>
              <div className="text-blue-200">Vistos Aprovados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.clients.toLocaleString()}+</div>
              <div className="text-blue-200">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.countries}+</div>
              <div className="text-blue-200">Países Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.satisfaction}%</div>
              <div className="text-blue-200">Satisfação</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluções completas para todas as suas necessidades de visto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <Card hover className="h-full cursor-pointer group">
                    <CardContent className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gradient-to-r from-red-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100">
                <div className="text-4xl font-bold text-red-600 mb-2">ISO</div>
                <div className="text-sm text-gray-600">9001:2015</div>
                <div className="text-xs text-gray-500 mt-1">Certificado</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Aprovação</div>
                <div className="text-xs text-gray-500 mt-1">Taxa de Sucesso</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-100">
                <div className="text-4xl font-bold text-red-600 mb-2">22+</div>
                <div className="text-sm text-gray-600">Anos</div>
                <div className="text-xs text-gray-500 mt-1">Experiência</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">93+</div>
                <div className="text-sm text-gray-600">Especialistas</div>
                <div className="text-xs text-gray-500 mt-1">Equipe Dedicada</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a S.O.S Canadá?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${index % 2 === 0 ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-blue-600 to-blue-800'} text-white rounded-full mb-4 shadow-lg`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">{testimonial.comment}</p>
                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
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
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Crie sua conta e comece a acompanhar seu processo de visto online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 shadow-2xl">
                  Criar Conta
                </Button>
              </Link>
              <Link href="/flights">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600">
                  Ver Voos em Tempo Real
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
