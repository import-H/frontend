import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
const API_URL = "http://localhost:8090";

const initialState = {
  status: null,
  posts: "",
  post: "",
};

// 유저 데이터 가져오기(api 테스트용)
export const getUser = createAsyncThunk(
  "post/getUser",
  async (data, dispatch, getState) => {
    const response = await axiosInstance.get(`${API_URL}/v1/user/id/1`);
    return response.data.data;
  },
);

// 전체 게시글 가져오기
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (boardId, dispatch, getState) => {
    // const response = await axios.get(`${API_URL}/v1/boards/${boardId}/posts`);

    const response = await axios.get(`${API_URL}/v1/boards/1/posts`);
    return response.data.list;
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

// 게시글 가져오기
export const getPost = createAsyncThunk(
  "post/getPost",
  async (data, dispatch, getState) => {
    const { boardId, postId } = data;
    const response = await axios.get(
      // `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
      `${API_URL}/v1/boards/1/posts/${postId}`,
    );
    console.log("post", response.data.data);
    return response.data.data;
  },
);

// 게시글 삭제하기
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data, dispatch, getState) => {
    const { boardId, postId } = data;
    const response = await axiosInstance.delete(
      // `/v1/boards/${boardId}/posts/${postId}`,
      `${API_URL}/v1/boards/1/posts/${postId}`,
    );
    return response.data.data;
  },
);

// 게시글 수정하기
export const editPost = createAsyncThunk("post/editPost", async data => {
  const { boardId, postId, postData } = data;
  const response = await axiosInstance.put(
    // `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
    `${API_URL}/v1/boards/1/posts/${postId}`,
    postData,
  );

  return response.data.data;
});

// 댓글 추가하기
export const addComment = createAsyncThunk(
  "post/addComment",
  async (data, dispatch, getState) => {
    const { postId, commentData } = data;
    console.log(data);
    const response = await axiosInstance.post(
      `${API_URL}/v1/posts/${postId}/comments`,
      {
        content: commentData,
      },
    );
    return response.data.data;
  },
);

// 댓글 삭제하기
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (data, dispatch, getState) => {
    const { postId, commentId } = data;
    const response = await axiosInstance.delete(
      `${API_URL}/v1/posts/${postId}/comments/${commentId}`,
    );
    return response.data.data;
  },
);

// 댓글 수정하기
export const editComment = createAsyncThunk(
  "post/editComment",
  async (data, dispatch, getState) => {
    const { postId, commentId, content } = data;
    const response = await axiosInstance.put(
      `${API_URL}/v1/posts/${postId}/comments/${commentId}`,
      {
        content: content,
      },
    );
    return response.data.data;
  },
);

// 이미지 파일 보내고 가져오기
export const uploadFile = createAsyncThunk(
  "post/uploadFile",
  async (formData, dispatch, getState) => {
    const response = await axiosInstance.post(
      `${API_URL}/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );
    console.log(response);
    return response.data;
  },
);

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
    //addPosts
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      Object.assign(state, initialState);
      state.status = "success";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
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
    // getPost
    [getPost.pending]: (state, action) => {
      state.getPost = "loading";
    },
    [getPost.fulfilled]: (state, action) => {
      Object.assign(state, initialState);
      state.getPost = "success";
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.getPost = "failed";
      state.error = action.error;
    },
    // editPost
    [editPost.pending]: (state, action) => {
      state.editStatus = "loading";
    },
    [editPost.fulfilled]: (state, action) => {
      state.editStatus = "success";
    },
    [editPost.rejected]: (state, action) => {
      state.editStatus = "failed";
      state.error = action.error;
    },
    // addComment
    [addComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
