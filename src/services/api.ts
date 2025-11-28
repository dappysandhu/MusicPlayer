import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "http://192.168.1.76:5000/api", 
  timeout: 10000,
});

// attach the token to each request if logged in
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
