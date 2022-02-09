import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
const API_URL = "http://localhost:8090";

const initialState = {
  status: null,
  banners: [],
};

// 유저 데이터 가져오기(api 테스트용)
export const getBanner = createAsyncThunk(
  "post/getBanner",
  async (dispatch, getState) => {
    const response = await axiosInstance.get(`${API_URL}/v1/main/banner`);
    return response.data.list;
  },
);

const slice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: {
    // getUser
    [getBanner.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBanner.fulfilled]: (state, action) => {
      state.status = "success";
      state.banners = action.payload;
    },
    [getBanner.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;
