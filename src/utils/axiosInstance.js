import axios from "axios";
const baseURL = "http://localhost:8090";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log("interceptor is working");
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  }

  const response = await axios.post(`${baseURL}/v1/reissue`, {
    accessToken: authTokens.accessToken,
    refreshToken: authTokens.refreshToken
  });
  console.log("in", authTokens, response.data);
  localStorage.setItem("authTokens", JSON.stringify(response.data.data));
  req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  return req;
});

export default axiosInstance;
