import axios from "axios";

const API = axios.create({
  baseURL: "https://midterm-project-il7p.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getUsers = () => API.get("/auth/users");