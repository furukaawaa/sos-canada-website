'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      // Salvar token e dados do admin
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      document.cookie = `token=${data.token}; path=/; max-age=604800`; // 7 dias

      // Redirecionar para painel admin
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Acesso Administrativo</CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Painel de controle do sistema
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Administrativo"
                placeholder="admin@soscanada.com.br"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600" disabled={loading}>
                {loading ? 'Entrando...' : 'Acessar Painel'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-700">
                ← Voltar para login de usuário
              </Link>
            </div>

            <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 text-center">
                🔐 Área restrita. Apenas administradores autorizados.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
