import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';

export const requseLogin = params => {
  return axios.post('/user/login', params);
}

export const getUserListPage = params => { return axios.get(`/user/listpage`,{ params: params }); };

export const deleteUserByBatch = params =>{return axios.get('/user/deleteUserByBatch',{ params: params })};
