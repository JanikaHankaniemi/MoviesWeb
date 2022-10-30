/* eslint-disable dot-notation */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API
});
export default axiosInstance;

export function setupInterceptors(store) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 500) {
        store.dispatch({ type: 'error/serverError' });
      } else if (error.response.status === 400) {
        store.dispatch({ type: 'error/badRequestError' });
      }
      return Promise.reject(error);
    },
  );
}
