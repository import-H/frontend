import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";

const initialState = {
  status: null,
};

// 배너 추가하기
export const addBanner = createAsyncThunk(
  "admin/addBanner",
  async (data, dispatch) => {
    const response = await axiosInstance.post(`${API_URL}/v1/banners`, data);
    return response.data.data;
  },
);

// 배너 삭제하기
export const deleteBanner = createAsyncThunk(
  "admin/deleteBanner",
  async (data, dispatch) => {
    const response = await axiosInstance.delete(`${API_URL}/v1/banners/1`);
    return response.data.data;
  },
);

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    // getUser
    [addBanner.pending]: (state, action) => {
      state.status = "loading";
    },
    [addBanner.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addBanner.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;
