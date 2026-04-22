import axios from "axios";
import api from "./central.api";

export const registerUserAPI = (userData) => {
  return api.post("/auth/register", userData);
};

export default registerUserAPI;


export const loginAPI = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};
