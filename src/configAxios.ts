import axios, { AxiosInstance } from 'axios';
import { API_URL } from './constants/apiUrl';

const getAxios = (timeout: number = 600000) => {
  const token: string | null = localStorage.getItem('@token');
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export default getAxios;
