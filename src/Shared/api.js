import axios from "axios";

const baseUrl= process.env.REACT_APP_API_URL

export const api = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  });