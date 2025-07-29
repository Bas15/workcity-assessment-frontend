export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
