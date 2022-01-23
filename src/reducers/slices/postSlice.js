import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";
const API_URL = "http://localhost:8090";

const initialState = {
  isLoading: false,
  error: false,
  login: false,
  nickname: ""
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPostSuccess(state, action) {},
    getuserSuccess(state, action) {
      state.isLoading = true;
      state.nickname = action.payload.nickName;
    }
  }
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

//addPost 비동기 처리(임시)
export function addPost(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUser() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosInstance.get(`${API_URL}/v1/user/id/1`);
      if (response.data.success) {
        dispatch(slice.actions.getuserSuccess(response.data.data));
        console.log(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
}

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
