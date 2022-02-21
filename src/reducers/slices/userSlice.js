// 프로필, 개인게시판 관련 sliceimport { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// axios
import axios from "axios";

// axios with auth
import axiosInstance from "../../utils/axiosInstance";
import { API_URL } from "../../config";
import jwt_decode from "jwt-decode";

const initialState = {
  status: null,
};
// refresh 토큰
// export const refresh = createAsyncThunk("user/refresh", async () => {
//   const authToken = JSON.parse(localStorage.getItem("authTokens"));
//   const response = await axios.post(`${API_URL}/v1/reissue`, {
//     accessToken: authToken.accessToken,
//     refreshToken: authToken.refreshToken,
//   });

//   localStorage.setItem("authTokens", JSON.stringify(response.data.data));
// });

// 프로필 가져오기
export const getProfile = createAsyncThunk("user/getProfile", async userId => {
  const response = await axiosInstance.get(`${API_URL}/v1/users/${userId}`);
  return response.data.data;
});

// 프로필 수정하기
export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data, thunkAPI) => {
    const { userId, userData } = data;
    const response = await axiosInstance.put(
      `${API_URL}/v1/users/${userId}`,
      userData,
    );
    // const re = await thunkAPI.dispatch(refresh());
    // console.log("re", re);
    return response.data.data;
  },
);

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(`${API_URL}/v1/users`);
  console.log(response.data.list);
  return response.data.list;
});

//sample
// export const getProducts = createAsyncThunk("getProducts", async (_, thunkAPI) => {
//   thunkAPI.dispatch(actionLoading());
//   const response = await axios.get("api");
//   return response;
// });
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    // getUser
    [getProfile.pending]: (state, action) => {
      state.check = "loading";
    },
    [getProfile.fulfilled]: (state, action) => {
      state.check = "success";
      state.profile = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.check = "failed";
      state.error = action.error;
    },
    [editProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [editProfile.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [editProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default slice.reducer;
