import axios from 'axios';

const URL = 'http://localhost:5000/api/auth/register';

// Create a function that takes data and returns the axios promise
const registerUserAPI = (userData) => {
  return axios.post(URL, userData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default registerUserAPI;


export const loginAPI =(data)=>{
  return axios.post(
   'http://localhost:5000/api/auth/login',data,{
    headers:{
    "content-Type":"application/json"
    }
   })
}