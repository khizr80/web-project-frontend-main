import api from "../axios/axios.config";

const path = "/file";

export const getFilesApiCall = async () => {
  try {
    const response = await api.get(`${path}`);
    console.log(response);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFileContentByIdApiCall = async (id) => {
  try {
    const response = await api.get(`${path}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const saveFileContentByIdApiCall = async (id, body) => {
  try {
    const response = await api.patch(`${path}/${id}`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createNewFileApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/create`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteFileByIdApiCall = async (id) => {
  try {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
