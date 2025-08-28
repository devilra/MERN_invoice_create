import axios from "axios";

const API = axios.create({
 // baseURL: "https://mern-invoice-create.onrender.com",
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default API;
