/**
 * ============================================
 * Utility Helpers
 * ============================================
 * Helpers: formatar data, gerar número de processo, helpers de status.
 */

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateProcessNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `PROC-${timestamp}-${random}`;
}

export function formatDate(date: Date | string | null): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    denied: 'bg-red-100 text-red-800',
    completed: 'bg-purple-100 text-purple-800',
    contacted: 'bg-indigo-100 text-indigo-800',
    scheduled: 'bg-cyan-100 text-cyan-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pendente',
    in_progress: 'Em Progresso',
    approved: 'Aprovado',
    denied: 'Negado',
    completed: 'Concluído',
    contacted: 'Contactado',
    scheduled: 'Agendado',
    cancelled: 'Cancelado',
  };
  return labels[status] || status;
}
