export interface AuthState {
  authMode: boolean;
  user: UserState | null;
}

export interface UserState {
    UserFName: string;
    UserLName: string;
    UserEmail: string;
}