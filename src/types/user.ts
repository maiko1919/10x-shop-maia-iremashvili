// ვინ არის შესული
export interface AuthUser {
  username: string;
  isLoggedIn: boolean;
}

// Login ფორმის ველები
export interface LoginFormValues {
  username: string;
  password: string;
}