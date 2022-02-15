import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "http://localhost:8090";

// 임시로 refreshToken도 여기에 저장해둠

const initialState = {
  status: null,
  user: {},
  isAuth: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, dispatch, getState) => {
    const response = await axios.post(`${API_URL}/v1/login`, {
      ...data,
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data.data));
    const userData = jwt_decode(response.data.data.accessToken);
    console.log(response.data.data, userData);
    return { user: userData };
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, dispatch, getState) => {
    const response = await axios.post(`${API_URL}/v1/signup`, {
      ...data,
    });
    return response.data.data;
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (dispatch, getState) => {
    if (getState.isAuth === true) {
      return;
    }
  },
);

const slice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    logout: (state, action) => {},
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.isAuth = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [signup.pending]: (state, action) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [logout.pending]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {
      Object.assign(state, initialState);
    },
    [logout.rejected]: (state, action) => {},
  },
});

export default slice.reducer;

export function refresh() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());

    try {
    } catch (e) {
      console.log(e);
      dispatch(slice.actions.hasError(e));
    }
  };
}
