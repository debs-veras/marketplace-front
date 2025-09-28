import { LoginForm } from '../types/auth';
import { UserForm } from '../types/user';
import { postRequest } from '../utils/axiosRequest';

export const userLoginRequest = async (data: LoginForm) => {
  return await postRequest(`auth/login`, data);
};

export const userRegisterRequest = async (data: UserForm) => {
  return await postRequest(`auth/register`, data);
};
