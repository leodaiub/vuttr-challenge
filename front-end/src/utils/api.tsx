import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/' });
//const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use(config => {
  if (localStorage.getItem('token'))
    config.headers.auth = `${localStorage.token}`;

  return config;
});

api.interceptors.response.use(null as any, error => {
  if (
    error.response.status === 401 &&
    error.response.data.message === 'Unauthenticated.'
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.location.reload();
  }
});

export default api;
