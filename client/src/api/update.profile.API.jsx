import api from "./central.api";
const updateProfile = async (id, profileData) => {
  try {
    const response = await api.post(`/users/upload-profile/${id}`, profileData);

    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default updateProfile;
