export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

export interface TodoRequest {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface TodoResponse {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Form data types
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TodoFormData = {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}; 