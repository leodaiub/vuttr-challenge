import axios from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use(config => {
  if (localStorage.getItem('token'))
    config.headers.auth = `${localStorage.token}`;

  return config;
});

api.interceptors.response.use(null as any, error => {
  if (error.response.status === 401) {
    toast.error(
      i18next.t('You have to be authenticated to perform this action'),
    );
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
});

export default api;
