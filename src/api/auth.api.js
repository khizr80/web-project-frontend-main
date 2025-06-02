import api from "../axios/axios.config";

const path = "/auth";

export const signUpApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/signup`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/login`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    return error.response.data;
  }
};

export const getUserApiCall = async () => {
  try {
    const response = await api.get(`${path}/user`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    return error.response.data;
  }
};
