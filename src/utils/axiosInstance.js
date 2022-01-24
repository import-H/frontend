import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8090";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `${authTokens?.accessToken}` }
});

// localStorage 말고, redux에 접근해서 dispatch와 select를 할 수 있는 방법은 없을까?

axiosInstance.interceptors.request.use(async (req) => {
  console.log("interceptor is working");
  req.headers.Authorization = `${authTokens?.accessToken}`;
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `${authTokens?.accessToken}`;
  }

  const user = jwt_decode(authTokens.accessToken);
  let isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("isExpired", isExpired, dayjs.unix(user.exp).diff(dayjs()));
  if (!isExpired) {
    return req;
  } else {
    const response = await axios.post(`${baseURL}/v1/reissue`, {
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data.data));

    authTokens = response.data.data;
    req.headers.Authorization = `${authTokens?.accessToken}`;
    return req;
  }
});

export default axiosInstance;

// https://github.com/divanov11/refresh-token-axios-interceptors/blob/master/frontend/src/utils/axiosInstance.js 참고함
