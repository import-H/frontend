import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useAxios from "../../utils/useAxios";
const API_URL = "http://localhost:3001";

const initialState = {
  isLoading: false,
  error: false,
  refreshToken: "",
  accessToken: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  login: false
};

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
    addPostSuccess(state, action) {}
  }
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// addPost 비동기 처리(임시)
export function addPost(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await useAxios().post(`${API_URL}/post`, ...data);
      if (response.success) {
        dispatch(slice.actions.registerSuccess());
      }
    } catch (e) {
      console.log(e);
    }
  };
}

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
