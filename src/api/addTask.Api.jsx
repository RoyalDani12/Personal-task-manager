import axios from "axios";

const addTaskApi = async (taskData) => {
  try {
    const URL = 'http://localhost:5000/api/tasks/create';
    const accessToken = localStorage.getItem('accessToken');

    // FIX 1: Wrap authorization inside a 'headers' object
    // FIX 2: Store the result in a variable and RETURN it
    const response = await axios.post(URL, taskData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    return response; // <--- THIS IS THE MISSING KEY
    
  } catch (error) {
    // FIX 3: Re-throw the error so your handleSubmit catch block can see it
    throw error.response || error;
  }
};

export default addTaskApi;