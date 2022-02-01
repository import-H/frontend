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

// 유저 데이터 가져오기(api 테스트용)
export const getUser = createAsyncThunk(
  "post/getUser",
  async (data, dispatch, getState) => {
    const response = await axiosInstance.get(`${API_URL}/v1/user/id/1`);
    return response.data.data;
  },
);

// 게시글 추가하기
export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, dispatch, getState) => {
    const { boardId, postData } = data;
    console.log(boardId, data);
    const response = await axiosInstance.post(`${API_URL}/v1/boards/1/posts`, {
      ...postData,
    });
    return response.data.data;
    // await axios.post("http://localhost:3001/posts", {
    //   boardId: boardId,
    //   ...post,
    // });
    // return data;
  },
);

// 게시판 내에 있는 전체 게시글 가져오기
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (boardId, dispatch, getState) => {
    const response = await axios.get(`${API_URL}/v1/boards/${boardId}/posts`);
    return response.data.data;
  },
);

// 게시글 가져오기
export const getPost = createAsyncThunk(
  "post/getPost",
  async (data, dispatch, getState) => {
    const { boardId, postId } = data;
    const response = await axios.get(
      `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
    );
    return response.data.data;
  },
);

// 게시글 삭제하기
export const deletePost = createAsyncThunk("post/deletePost", async data => {
  const { boardId, postId } = data;
  const response = await axiosInstance.delete(
    `/v1/boards/${boardId}/posts/${postId}`,
  );
  return response.data.data;
});

// createSlice
const slice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // getUser
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
    // addPost
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
    // getPosts
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
    // getPost
    [getPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;

// redux-toolkit 비동기 처리하는 방법 고민중 => 내장된 thunk 사용 가능성 높음

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
