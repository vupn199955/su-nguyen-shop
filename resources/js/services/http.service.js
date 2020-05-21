import AXIOS from 'axios';
import Router from '@/router';

const HTTP = AXIOS.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: '/api/'
});

const request = (method, url, data = {}) => {
  let config  = {
    url,
    method,
  }
  if (method === 'GET') {
    config.params = data
  } else {
    config.data = data
  }
  return HTTP.request(config);
}

HTTP.interceptors.request.use(
  (config) => {
    const token = Vue.$cookies.get('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return error;
  }
);
HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Router.go(`/login-admin?redirect=${Router.currentRoute.path}`);
    }
    return error;
  }
);


export default {
  get(url, params) {
    return request('GET', url, params);
  },
  post(url, data) {
    return request('POST', url, data);
  },
  put(url, data) {
    return request('PUT', url, data);
  },
  remove(url) {
    return request('REMOVE', url);
  }
}
