/**
 * ============================================
 * WhatsApp Floating Button
 * ============================================
 *
 * Botão flutuante no canto inferior direito.
 * Abre conversa direta com a empresa no WhatsApp.
 *
 * Para alterar o número: edite WHATSAPP_NUMBER abaixo.
 * Formato: código do país + DDD + número (só dígitos).
 */

'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

/** Número do WhatsApp da empresa (troque pelo real) */
const WHATSAPP_NUMBER = '551112345678';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Gostaria de saber mais sobre os serviços da S.O.S Canadá & Mundo dos Vistos.'
);

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip — aparece no hover */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-xl border border-gray-100 pointer-events-none"
      >
        Fale conosco! 💬
      </motion.span>

      {/* Botão principal */}
      <div className="relative">
        {/* Pulso animado */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </div>
      </div>
    </motion.a>
  );
}
