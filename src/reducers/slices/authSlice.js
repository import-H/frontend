import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:8090";

// 임시로 refreshToken도 여기에 저장해둠
const initialState = {
  isLoading: false,
  error: false,
  authTokens: "",
  isAuth: false
};

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerSuccess(state) {
      state.isLoading = false;
    },
    loginSuccess(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
      state.isLoading = false;
    },
    updateToken(state, action) {
      state.user = action.payload.user;
      state.isLoading = false;
      state.authTokens = action.payload;
      state.isAuth = true;
    },
    logoutSuccess(state, action) {
      Object.assign(state, initialState); // state 리셋
    }
  }
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// register 비동기 처리
export function register(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(`${API_URL}/v1/register`, {
        ...data
      });
      if (response.success) {
        dispatch(slice.actions.registerSuccess());
      }
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError(e));
    }
  };
}

// login 비동기 처리
export function login(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        ...data
      });
      console.log("res", response.data.data);
      if (response.data.success) {
        dispatch(slice.actions.loginSuccess(response.data.data));
        localStorage.setItem("authTokens", JSON.stringify(response.data.data));
      }
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError(e));
    }
  };
}

// logout 비동기 처리
export function logout() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.logoutSuccess());
      localStorage.clear();
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError(e));
    }
  };
}

export function refresh() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError(e));
    }
  };
}
