import axios from "axios";

/* axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
  
      return Promise.reject(error);
    }
  ); */

export const axiosRegister = (url: string, data = {}, option = {}) => {
  return axios.post(`${process.env.VUE_APP_URL}/api/` + url, data);
};

export const axiosLogin = async (url: string, data = {}, option = {}) => {
  const resdata = await axios.post(
    `${process.env.VUE_APP_URL}/api/` + url,
    data
  );

  return resdata;
};

export const axiosAddTranasaction = async (
  url: string,
  data = {},
  option = {}
) => {
  const resdata = await axios.post(
    `${process.env.VUE_APP_URL}/api/` + url,
    data
  );
  return resdata;
};

export const axioDataById = async (url: string, data = {}, option = {}) => {
  const resdata = await axios.get(
    `${process.env.VUE_APP_URL}/api/` + url,
    data
  );
  return resdata;
};

export const axioDeleteById = async (url: string, data = {}, option = {}) => {


  const resdata = await axios.delete(
    `${process.env.VUE_APP_URL}/api/` + url,
    data
  );
  return resdata;
};


export const axioupdateTransaction = async (url: string, data = {}, option = {}) => {
  const resdata = await axios.put(
    `${process.env.VUE_APP_URL}/api/` + url,
    data
  );
  return resdata;
};
