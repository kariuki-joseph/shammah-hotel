import axios from "axios";
// create axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER_URL}`,
  headers: {
    "content-type": "application/json",
  },
});

export default axiosInstance;
