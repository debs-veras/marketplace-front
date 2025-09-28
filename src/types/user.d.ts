export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: number;
  cpf: number;
};

export type UserForm = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword?: string;
};
