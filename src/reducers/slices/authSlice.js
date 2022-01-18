import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  login: false
};

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
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
      await axios.post("http://localhost:3001/user", {
        id: 2,
        ...data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

// login 비동기 처리(임시)
export function login() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get("http://localhost:3001/user?id=1");
      console.log("res", response);
    } catch (e) {
      console.log(e);
    }
  };
}
