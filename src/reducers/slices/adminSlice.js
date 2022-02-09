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

// 배너 추가하기
export const addBanner = createAsyncThunk(
  "admin/addBanner",
  async (data, dispatch, getState) => {
    const response = await axiosInstance.post(`${API_URL}/v1/user/id/1`, data);
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
