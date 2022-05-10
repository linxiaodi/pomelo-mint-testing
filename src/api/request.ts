import axios from 'axios';

export const request = axios.create({
})


request.interceptors.response.use((response) => {
  const res = response.data;

  if (res.code !== 1) {
    // do toast
    return Promise.reject(new Error(res.msg));
  }

  return res;
}, (error) => {
  console.log('error', error)
  return Promise.reject(error)
})
