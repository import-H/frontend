import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

export const login = createAsyncThunk(
  "sample/login",
  async (data, dispatch, getState) => {
    const response = await axios.post(`${API_URL}/v1/login`, {
      ...data
    });
    return response.data.data;
  }
);

// 임시로 refreshToken도 여기에 저장해둠
const initialState = {
  user: [],
  status: null
};

// redux-toolkit 가이드: https://redux-toolkit.js.org/tutorials/quick-start
const slice = createSlice({
  name: "sample",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
    }
  }
});

export default slice.reducer;
