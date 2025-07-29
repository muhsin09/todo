import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthRequest, AuthResponse, RegisterRequest, TodoRequest, TodoResponse } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/register', data);
    return response.data;
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/login', data);
    return response.data;
  }

  // Todo endpoints
  async getTodos(completed?: boolean): Promise<TodoResponse[]> {
    const params = completed !== undefined ? { completed } : {};
    const response: AxiosResponse<TodoResponse[]> = await this.api.get('/api/todos', { params });
    return response.data;
  }

  async getTodoById(id: number): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await this.api.get(`/api/todos/${id}`);
    return response.data;
  }

  async createTodo(data: TodoRequest): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await this.api.post('/api/todos', data);
    return response.data;
  }

  async updateTodo(id: number, data: TodoRequest): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await this.api.put(`/api/todos/${id}`, data);
    return response.data;
  }

  async deleteTodo(id: number): Promise<void> {
    await this.api.delete(`/api/todos/${id}`);
  }

  async toggleTodoComplete(id: number): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await this.api.patch(`/api/todos/${id}/complete`);
    return response.data;
  }
}

export const apiService = new ApiService(); 