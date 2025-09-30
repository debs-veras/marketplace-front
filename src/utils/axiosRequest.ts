import instance from '../configAxios';

function handleError(error: any) {
  console.log('Error', error.response.data.message);
  return {
    success: false,
    tipo: 'error',
    data: error.response.data.message || 'Erro ao realizar operação',
  };
}

export const putRequest = async (url: string, obj: any) => {
  const axios = instance();
  try {
    const response = await axios.put(url, obj);
    return {
      data: response.data,
      success: true,
      ...response.data,
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const postRequest = async (url: string, obj: any) => {
  const axios = instance();

  try {
    const response = await axios.post(url, obj);
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    return handleError(error);
  }
};

export const getRequest = async (url: string) => {
  const axios = instance();
  try {
    const response = await axios.get(url);
    return { data: response.data, success: true };
  } catch (error: any) {
    return handleError(error);
  }
};

export const deleteRequest = async (url: string, data?: any) => {
  const axios = instance();

  try {
    const response = await axios.delete(url, { data });
    return { data: response.data, success: true };
  } catch (error: any) {
    return handleError(error);
  }
};
export const patchRequest = async (url: string, obj: any) => {
  const axios = await instance();

  try {
    const response = await axios.patch(url, obj);
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
};
