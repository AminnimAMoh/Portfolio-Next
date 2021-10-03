import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInterception = () => {
  const baseURL = "https://andramedian-database.herokuapp.com/";
  const headers = { "Content-Type": "application/json" };

  const axiosInterceptor = axios.create({
    baseURL,
    timeout: 5000,
    headers,
  });

  const onResponse = (response: AxiosResponse): any =>
    new Promise((resolve, reject) => {
      resolve(response);
    });
  const onResponseError = (error: AxiosError): any =>
    new Promise((resolve, reject) => {
      reject(error);
    });

  axiosInterceptor.interceptors.response.use(onResponse, onResponseError);

  return axiosInterceptor;
};

export default axiosInterception;
