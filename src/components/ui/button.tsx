/**
 * ============================================
 * UI Button
 * ============================================
 * Botão com variantes: primary, secondary, outline, ghost, danger.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transition-all duration-300',
    secondary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50 transition-all duration-200',
    ghost: 'text-gray-700 hover:bg-gray-100 transition-all duration-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-300',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
