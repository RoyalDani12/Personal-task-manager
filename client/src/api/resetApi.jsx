import api from "./central.api";

export const resetAPI = async (password,confirmPassword,token) => {
  try {
    const URL = `/auth/reset-pass/${token}`;
    const response = await api.post(URL, {
      password,
      confirmPassword
    });
    return response
  } catch (error) {
    throw error
  }
};
