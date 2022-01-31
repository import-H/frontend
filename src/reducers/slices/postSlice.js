import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosInstance from "../../utils/axiosInstance";
const API_URL = "http://localhost:8090";

const initialState = {
  status: null,
  nickname: "",
  posts: [],
  post: {},
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
    const { boardId, post } = data;
    const response = await axiosInstance.post(
      `${API_URL}/v1/boards/${boardId}/posts`,
      {
        ...post,
      },
    );
    return response.data.data;
    // await axios.post("http://localhost:3001/posts", {
    //   boardId: boardId,
    //   ...post,
    // });
    // return data;
  },
);
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (boardId, dispatch, getState) => {
    const response = await axios.get(`${API_URL}/v1/boards/${boardId}/posts`);
    return response.data.data;
  },
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId, dispatch, getState) => {
    //const response = await axiosInstance.post(`${API_URL}/v1/post/${postId}`);
    const response = await axios.get("http://localhost:3001/posts/1");
    console.elog(response);
    return response.data;
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
      // state.post = action.payload;
    },
    [addPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
