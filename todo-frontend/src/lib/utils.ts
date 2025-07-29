import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getPriorityColor(priority: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (priority) {
    case 'HIGH':
      return 'text-red-600 bg-red-100';
    case 'MEDIUM':
      return 'text-yellow-600 bg-yellow-100';
    case 'LOW':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getPriorityText(priority: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (priority) {
    case 'HIGH':
      return 'Yüksek';
    case 'MEDIUM':
      return 'Orta';
    case 'LOW':
      return 'Düşük';
    default:
      return 'Belirtilmemiş';
  }
}

export function isTokenValid(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch {
    return false;
  }
} 