import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ajuste para sua porta
});

export default api;
