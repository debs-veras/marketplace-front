import { LoginAuth } from '../types/auth';
import { postRequest } from '../utils/axiosRequest';

export const userLoginRequest = async (data: LoginAuth) => {
  return await postRequest(`auth/login`, data);
};
