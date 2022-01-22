import axios from "axios";

const baseURL = "http://localhost:3001";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  }

  const response = await axios.post(`${baseURL}/v1/refresh`, {
    refresh: authTokens.refreshToken
  });
  localStorage.setItme("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  return req;
});

export default axiosInstance;
