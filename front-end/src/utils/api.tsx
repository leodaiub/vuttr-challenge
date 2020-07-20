import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/' });
//const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// api.interceptors.request.use((config) => {
//   if (localStorage.token)
//     config.headers.Authorization = `Bearer ${localStorage.token}`;

//   if (store.getState().area)
//     config.headers['X-AreaId'] = store.getState().area.id;
//   if (i18n.language) config.headers['X-Localization'] = i18n.language;

//   return config;
// });

// api.interceptors.response.use(null, (error) => {
//   if (
//     error.response.status === 401 &&
//     error.response.data.message === 'Unauthenticated.'
//   ) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('area_id');
//     document.location.reload();
//   }

//   if (
//     error.response.status === 400 &&
//     typeof error.response.data === 'object'
//   ) {
//     error.response.data.forEach((error) =>
//       toast.error(i18n.t(`error:${error}`), { autoClose: 10000 })
//     );
//   }

//   return Promise.reject(error);
// });

export default api;
