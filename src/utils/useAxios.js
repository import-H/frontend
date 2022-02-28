import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { refresh } from "../reducers/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../config";

const baseURL = API_URL;

const useAxios = () => {
  const dispatch = useDispatch();
  const { authTokens } = useSelector(state => state.auth);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/v1/reissue`, {
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    dispatch(refresh(response.data)); //authtoken, user

    req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;

// https://github.com/divanov11/refresh-token-axios-interceptors/blob/master/frontend/src/utils/useAxios.js#L20 참고함
