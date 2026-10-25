/**
 * ============================================
 * UI Card
 * ============================================
 * Cards com hover, header, título e conteúdo.
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md p-6',
        hover && 'transition-transform duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-bold text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}
