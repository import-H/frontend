// 프로필, 개인게시판 관련 sliceimport { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";

const initialState = {
  status: null,
};

// 프로필 가져오기
export const getProfile = createAsyncThunk("user/getProfile", async userId => {
  const response = await axiosInstance.get(`${API_URL}/v1/users/${userId}`);
  return response.data.data;
});

export const editProfile = createAsyncThunk("user/editProfile", async data => {
  const { userId, userData } = data;
  const response = await axiosInstance.put(
    `${API_URL}/v1/users/${userId}`,
    userData,
  );
  return response.data.data;
});

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // getUser
    [getProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProfile.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;
