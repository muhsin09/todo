import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo, TodoFormData } from '@/types';
import { todoSchema } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { X } from 'lucide-react';

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TodoForm = ({ todo, onSubmit, onCancel, loading = false }: TodoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      dueDate: todo?.dueDate ? todo.dueDate.split('T')[0] : '',
      priority: todo?.priority || 'MEDIUM',
    },
  });

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit(data);
  };

  const priorityOptions = [
    { value: 'LOW', label: 'Düşük' },
    { value: 'MEDIUM', label: 'Orta' },
    { value: 'HIGH', label: 'Yüksek' },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{todo ? 'Görevi Düzenle' : 'Yeni Görev'}</CardTitle>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            label="Başlık"
            placeholder="Görev başlığı"
            error={errors.title?.message}
            {...register('title')}
          />

          <Textarea
            label="Açıklama"
            placeholder="Görev açıklaması (opsiyonel)"
            error={errors.description?.message}
            {...register('description')}
          />

          <Input
            label="Teslim Tarihi"
            type="date"
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />

          <Select
            label="Öncelik"
            options={priorityOptions}
            error={errors.priority?.message}
            {...register('priority')}
          />

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
            >
              {todo ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 