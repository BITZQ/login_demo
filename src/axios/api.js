import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';

export const requseLogin = params => {
  return axios.post('/user/login', params);
}

export const getUserListPage = params => { return axios.get(`/user/listpage`,{ params: params }); };

export const deleteUserByBatch = params =>{return axios.get('/user/deleteUserByBatch',{ params: params })};

export const addUser = params =>{return axios.get('/user/addUser',{ params: params })};

export const editUser = params =>{return axios.get('/user/updateUser',{params:params})};
