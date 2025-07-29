import { Todo } from '@/types';
import { formatDate, getPriorityColor, getPriorityText } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { CheckCircle, Circle, Edit, Trash2, Calendar, Flag } from 'lucide-react';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoCard = ({ todo, onToggleComplete, onEdit, onDelete }: TodoCardProps) => {
  const handleToggleComplete = () => {
    onToggleComplete(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${todo.completed ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={handleToggleComplete}
              className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
              aria-label={todo.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
            >
              {todo.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <CardTitle className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </CardTitle>
              {todo.description && (
                <p className={`text-sm text-gray-600 mt-1 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {todo.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(todo.dueDate)}</span>
            </div>
          )}
          {todo.priority && (
            <div className="flex items-center space-x-1">
              <Flag className="h-4 w-4" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                {getPriorityText(todo.priority)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center space-x-2 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Düzenle
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}; 