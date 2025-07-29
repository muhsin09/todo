'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Todo, TodoFormData } from '@/types';
import { apiService } from '@/services/api';
import { isTokenValid } from '@/lib/utils';
import { TodoCard } from '@/components/TodoCard';
import { TodoForm } from '@/components/TodoForm';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, LogOut, Filter, CheckSquare, Square } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    if (!isTokenValid()) {
      router.push('/login');
      return;
    }
    loadTodos();
  }, [router]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Görevler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (data: TodoFormData) => {
    try {
      setFormLoading(true);
      await apiService.createTodo(data);
      setShowForm(false);
      loadTodos();
    } catch (error) {
      console.error('Görev oluşturulurken hata:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTodo = async (data: TodoFormData) => {
    if (!editingTodo) return;
    
    try {
      setFormLoading(true);
      await apiService.updateTodo(editingTodo.id, data);
      setEditingTodo(null);
      loadTodos();
    } catch (error) {
      console.error('Görev güncellenirken hata:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Bu görevi silmek istediğinizden emin misiniz?')) return;
    
    try {
      await apiService.deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error('Görev silinirken hata:', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      await apiService.toggleTodoComplete(id);
      loadTodos();
    } catch (error) {
      console.error('Görev durumu değiştirilirken hata:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Görevler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">To-Do Uygulaması</h1>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Square className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Toplam Görev</p>
                  <p className="text-2xl font-bold">{todos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckSquare className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Tamamlanan</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Square className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Bekleyen</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'pending')}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tümü</option>
              <option value="pending">Bekleyen</option>
              <option value="completed">Tamamlanan</option>
            </select>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Görev
          </Button>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'Henüz görev eklenmemiş. Yeni bir görev oluşturmaya başlayın!'
                  : filter === 'completed'
                  ? 'Tamamlanan görev bulunmuyor.'
                  : 'Bekleyen görev bulunmuyor.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {(showForm || editingTodo) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <TodoForm
            todo={editingTodo || undefined}
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            onCancel={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
            loading={formLoading}
          />
        </div>
      )}
    </div>
  );
}
