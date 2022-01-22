import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "http://localhost:3001";

const initialState = {
  isLoading: false,
  error: false,
  token: "",
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
      const [token, , name] = action.payload;
      state.user = name;
      state.token = token;
      state.isLoading = false;
    },
    updateToken(state, action) {
      const [accessToken, , name] = action.payload;
      state.user = name;
      state.token = accessToken;
      state.isLoading = false;
    }
  }
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// register 비동기 처리(임시)
export function register(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        ...data
      });
      if (response.success) {
        dispatch(slice.actions.registerSuccess());
      }
    } catch (e) {
      console.log(e);
    }
  };
}

// login 비동기 처리(임시)
export function login(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        ...data
      });
      if (response.success) {
        dispatch(slice.actions.loginSuccess(response));
        localStorage.setItem("authToken", JSON.stringify(response));
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export function sampleToken() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = {
      user: "oseung",
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAaG9uZ2lrLmFjLmtyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0MjY5NjI3MywiZXhwIjoxNjQyNjk5ODczfQ.jGML5KAcgWo4EOAcu7NpBty_8HpFl87OmH2s7fkeHco",
      refreshToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNAaG9uZ2lrLmFjLmtyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0MjY5NjI3MywiZXhwIjoxNjQzOTA1ODczfQ.Q00obCIagjBV9FWrVVTadNb1VrngFkceKvaOkHLaaww"
    };
    dispatch(slice.actions.updateToken(response));
    localStorage.setItem("authToken", JSON.stringify(response));
  };
}
