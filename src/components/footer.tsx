/**
 * ============================================
 * Footer
 * ============================================
 * Rodapé institucional: logo, links, contato e acesso admin discreto.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-blue-900/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image 
                src="/logo-sos-canada.png" 
                alt="S.O.S Canadá" 
                width={180} 
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4">
              A melhor assessoria de vistos do Brasil com mais de 22 anos de experiência.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/canada" className="text-gray-400 hover:text-white transition-colors">
                  Visto Canadense
                </Link>
              </li>
              <li>
                <Link href="/services/usa" className="text-gray-400 hover:text-white transition-colors">
                  Visto Americano
                </Link>
              </li>
              <li>
                <Link href="/services/other" className="text-gray-400 hover:text-white transition-colors">
                  Outros Países
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-400 hover:text-white transition-colors">
                  Consulta
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/flights" className="text-gray-400 hover:text-white transition-colors">
                  Voos em Tempo Real
                </Link>
              </li>
              <li>
                <Link href="/airports" className="text-gray-400 hover:text-white transition-colors">
                  Aeroportos
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">São Paulo, SP - Brasil</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+55 (11) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contato@soscanada.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} S.O.S Canadá & Mundo dos Vistos. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Certificado ISO 9001:2015 | 95% de aprovação de vistos
          </p>
          <Link href="/admin/login" className="text-gray-600 hover:text-gray-400 text-xs mt-4 inline-block transition-colors">
            Acesso Administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
