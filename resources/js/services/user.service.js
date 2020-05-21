import http from './http.service';

export default {
  login: (payload) => {
    return http.post('login', payload)
  },
  getCurrentUser: () => {
    return http.get('user');
  }
}