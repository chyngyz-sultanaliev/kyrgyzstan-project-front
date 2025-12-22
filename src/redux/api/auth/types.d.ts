namespace AUTH {
  export type LoginRequest = {
    email: string;
    password: string;
  };

  export type LoginResponse = {
    success: boolean;
    message: string;
    token: string;
    userId: string;
    email: string;
    user: string;
  };

  export type RegisterRequest = {
    email: string;
    password: string;
    username: string;
  };

  export type AuthError = {
    success: boolean;
    message: string;
  };

  export type Error = {
    status: number;
    data?: AuthError;
  };
}
