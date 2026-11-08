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

// Profile ფორმის ველები
export interface ProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}