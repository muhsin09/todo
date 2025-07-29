import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, RegisterFormData } from '@/types';
import { loginSchema, registerSchema } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: LoginFormData | RegisterFormData) => void;
  loading?: boolean;
}

export const AuthForm = ({ mode, onSubmit, loading = false }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const handleFormSubmit = (data: LoginFormData | RegisterFormData) => {
    onSubmit(data);
  };

  const isRegister = mode === 'register';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="relative">
            <Input
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              placeholder="Şifrenizi girin"
              error={errors.password?.message}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {isRegister && (
            <>
              <div className="relative">
                <Input
                  label="Şifre Onayı"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi tekrar girin"
                  error={(isRegister && (errors as import('react-hook-form').FieldErrors<RegisterFormData>).confirmPassword?.message) || undefined}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p>Şifre gereksinimleri:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>En az 8 karakter</li>
                  <li>En az bir rakam</li>
                  <li>En az bir küçük harf</li>
                  <li>En az bir büyük harf</li>
                  <li>En az bir özel karakter (@#$%^&+=!)</li>
                </ul>
              </div>
            </>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegister ? 'Zaten hesabınız var mı?' : 'Hesabınız yok mu?'}
            <button
              type="button"
              onClick={() => window.location.href = isRegister ? '/login' : '/register'}
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              {isRegister ? 'Giriş yapın' : 'Kayıt olun'}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 