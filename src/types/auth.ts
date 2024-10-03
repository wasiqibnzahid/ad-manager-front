export interface CreateUserPayload {
  username: string;
  password: string;
  report_id: number;
  is_admin: boolean;
}

export interface User {
  username: string;
  report_id: number;
  id: number;
}

export interface UserData {
  email: string;
  username: string;
  is_admin: string;
  report_id: string;
}
export interface LoginResponse {
  access: string;
  refresh: string;
}
