'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData, RegisterFormData } from '@/types';
import { apiService } from '@/services/api';
import { isTokenValid } from '@/lib/utils';
import { AuthForm } from '@/components/AuthForm';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTokenValid()) {
      router.push('/');
    }
  }, [router]);

  const handleRegister = async (data: LoginFormData | RegisterFormData) => {
    const registerData = data as RegisterFormData;
    try {
      setLoading(true);
      const response = await apiService.register(registerData);
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error: unknown) {
      console.error('Kayıt hatası:', error);
      const errorMessage = error instanceof Error ? error.message : 'Kayıt olurken bir hata oluştu';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Oluşturun</h1>
          <p className="text-gray-600">Yeni bir hesap oluşturun</p>
        </div>
        <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />
      </div>
    </div>
  );
} 