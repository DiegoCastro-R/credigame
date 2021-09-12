import axios from "axios";

const api = axios.create({
  baseURL: "http://api.credigame.tk",
});

export default api;
