import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";

const initialState = {
  status: null,
  banners: [],
};

// 배너 가져오기
export const getBanner = createAsyncThunk(
  "main/getBanner",
  async (dispatch, getState) => {
    const response = await axios.get(`${API_URL}/v1/banners`);
    return response.data.list;
  },
);

// 배너 추가하기
export const addBanner = createAsyncThunk("main/addBanner", async data => {
  const response = await axiosInstance.post(`${API_URL}/v1/banners`, { data });
});

// 배너 삭제하기
export const deleteBanner = createAsyncThunk(
  "main/deleteBanner",
  async bannerId => {
    const response = await axiosInstance.delete(
      `${API_URL}/v1/banners/${bannerId}`,
    );
  },
);

export const getMainPosts = createAsyncThunk(
  "main/getMainPosts",
  async (number, dispatch, getState) => {
    const response = await axios.get(`${API_URL}/v1/main`, {
      params: {
        page: number,
      },
    });
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
    [getMainPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMainPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload;
    },
    [getMainPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;
