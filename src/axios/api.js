import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';

export const requseLogin = params => {
  return axios.post('/user/login', params);
}
