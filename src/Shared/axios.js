import Cookies from "universal-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

export const roomApi = axios.create({
  baseURL: "https://api.wepeech.com:8443/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

roomApi.interceptors.request.use(function (config) {
const cookies = new Cookies();
const token = cookies.get("token");
config.headers.common["Authorization"] = `${token}`;
return config;
});