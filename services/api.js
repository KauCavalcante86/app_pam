import axios from "axios";

const api = axios.create({
  baseURL: "http://10.171.237.192:8000/api", 
  timeout: 10000,
});

export default api;
