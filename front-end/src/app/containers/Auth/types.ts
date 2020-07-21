/* --- STATE --- */
export interface AuthState {
  authenticated: boolean;
  user: any;
  loading: boolean;
  error: string;
}

export type ContainerState = AuthState;
