import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(1, 'Şifre gereklidir'),
});

export const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$)/, 
      'Şifre en az bir rakam, bir küçük harf, bir büyük harf ve bir özel karakter içermelidir'),
  confirmPassword: z.string().min(1, 'Şifre onayı gereklidir'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

export const todoSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir').max(100, 'Başlık en fazla 100 karakter olabilir'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TodoFormData = z.infer<typeof todoSchema>; 