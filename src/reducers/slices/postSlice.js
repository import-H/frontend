import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";
const API_URL = "http://localhost:8090";

const initialState = {
  status: null,
  nickname: "",
};

export const getUser = createAsyncThunk(
  "post/getUser",
  async (data, dispatch, getState) => {
    const response = await axiosInstance.get(`${API_URL}/v1/user/id/1`);
    return response.data.data;
  },
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, dispatch, getState) => {
    await axios.post("http://localhost:3001/posts", {
      ...data,
    });
    return data;
  },
);
export const getPost = createAsyncThunk(
  "post/getPost",
  async (data, dispatch, getState) => {
    await axios.get("http://localhost:3001/posts");
    return data;
  },
);

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.nickname = action.payload.nickName;
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [addPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.post = action.payload;
    },
    [addPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
