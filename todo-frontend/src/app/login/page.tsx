'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData, RegisterFormData } from '@/types';
import { apiService } from '@/services/api';
import { isTokenValid } from '@/lib/utils';
import { AuthForm } from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTokenValid()) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (data: LoginFormData | RegisterFormData) => {
    const loginData = data as LoginFormData;
    try {
      setLoading(true);
      const response = await apiService.login(loginData);
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error: unknown) {
      console.error('Giriş hatası:', error);
      const errorMessage = error instanceof Error ? error.message : 'Giriş yapılırken bir hata oluştu';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h1>
          <p className="text-gray-600">Hesabınıza giriş yapın</p>
        </div>
        <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
} 