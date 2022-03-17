import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";

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

    const response = await axios.get(`${API_URL}/v1/boards/${boardId}`);
    return response.data.list;
  },
);

// 게시글 추가하기
export const addPost = createAsyncThunk(
  "post/addPost",
  async (postData, { rejectWithValue }) => {
    try {
      console.log(postData);
      const response = await axiosInstance.post(`${API_URL}/v1/posts`, {
        ...postData,
      });

      return response.data.data;
    } catch (err) {
      let error = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

// 게시글 가져오기
export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId, { getState }) => {
    if (getState().auth.isAuth) {
      const response = await axiosInstance.get(
        // `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
        `${API_URL}/v1/posts/${postId}`,
      );
      return response.data.data;
    } else {
      const response = await axios.get(
        // `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
        `${API_URL}/v1/posts/${postId}`,
      );
      return response.data.data;
    }
  },
);

// 게시글 삭제하기
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data, dispatch, getState) => {
    const { boardId, postId } = data;
    const response = await axiosInstance.delete(
      // `/v1/boards/${boardId}/posts/${postId}`,
      `${API_URL}/v1/posts/${postId}`,
    );
    return response.data.data;
  },
);

// 게시글 수정하기
export const editPost = createAsyncThunk("post/editPost", async data => {
  const { postId, postData } = data;
  const response = await axiosInstance.put(
    // `${API_URL}/v1/boards/${boardId}/posts/${postId}`,
    `${API_URL}/v1/posts/${postId}`,
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

// 좋아요 누르기
export const addLike = createAsyncThunk("post/addLike", async postId => {
  const response = await axiosInstance.post(
    `${API_URL}/v1/posts/${postId}/like`,
  );
  return response.data.data;
});

// 좋아요 취소
export const deleteLike = createAsyncThunk("post/deleteLike", async postId => {
  const response = await axiosInstance.delete(
    `${API_URL}/v1/posts/${postId}/like`,
  );
  return response.data.data;
});

// 이미지 파일 보내고 가져오기
export const uploadFile = createAsyncThunk(
  "post/uploadFile",
  async (formData, dispatch, getState) => {
    const response = await axiosInstance.post(
      `${API_URL}/v1/file/upload`,
      formData,
      { header: { "content-type": "multipart/formdata" } },
    );
    return response.data.data;
  },
);

// createSlice
const slice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // 유저 가져오기(test)
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
    // 전체 게시글 가져오기
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.addPost = "";
      state.status = "success";
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    // 게시글 추가하기
    [addPost.pending]: (state, action) => {
      state.addPost = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.addPost = "success";
    },
    [addPost.rejected]: (state, action) => {
      state.addPost = "failed";
      state.error = action.error;
    },
    // 게시글(단일) 가져오기
    [getPost.pending]: (state, action) => {
      state.getPost = "loading";
    },
    [getPost.fulfilled]: (state, action) => {
      state.getPost = "success";
      state.post = action.payload;
      state.post.comments = action.payload.comments.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },
    [getPost.rejected]: (state, action) => {
      state.getPost = "failed";
      state.error = action.error;
    },
    // 게시글 수정
    [editPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [editPost.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [editPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    // 댓글 추가
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
    // 댓글 삭제
    [deleteComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [deleteComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    // 댓글 수정
    [editComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [editComment.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [editComment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    // 좋아요 상태 변경하기
    [addLike.pending]: (state, action) => {
      state.status = "loading";
    },
    [addLike.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addLike.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    // uploadFile
    [uploadFile.pending]: (state, action) => {
      state.status = "loading";
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.file = action.payload;
      state.status = "success";
    },
    [uploadFile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
