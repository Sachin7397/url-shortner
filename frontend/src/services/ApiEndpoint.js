import axios from "axios";

const instance = axios.create({
  baseURL: "https://url-shortner-backend-u106.onrender.com/url",
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("intercpert reponse", response);
    return response;
  },
  function (error) {
    console.log("intercpert reponse", error);
    return Promise.reject(error);
  }
);
