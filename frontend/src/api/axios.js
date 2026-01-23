import axios from "axios";

const api = axios.create({
  baseURL: "https://midterm-project-il7p.onrender.com/api",
});

// 🔥 ADD THIS
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default api;
