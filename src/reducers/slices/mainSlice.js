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

const slice = createSlice({
  name: "main",
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
  },
});

export default slice.reducer;
