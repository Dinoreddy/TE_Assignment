import axios from "axios";



const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/projects" : "https://te-assignment-backend.onrender.com/api/projects",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
