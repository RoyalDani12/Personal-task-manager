import api from "./central.api";

const forgotApi = async (email) => {
  try {
    const URL = "/auth/forgot-pass";
    const response = await api.post(URL, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default forgotApi;
