import api from "../axios/axios.config";

const path = "/code";

export const executeCodeApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/execute`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const analyseCodeApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/analyze`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
