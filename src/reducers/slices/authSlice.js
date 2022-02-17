import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../../config";

// 임시로 refreshToken도 여기에 저장해둠

const initialState = {
  status: null,
  user: {},
  isAuth: false,
};

export const login = createAsyncThunk(
  "auth/login",

  async (wdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        ...wdata,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data.data));
      const userData = jwt_decode(response.data.data.accessToken);
      console.log(response.data.data, userData);
      return { user: userData };
    } catch (err) {
      let error = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (wdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/v1/signup`, {
        ...wdata,
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (dispatch, getState) => {
    if (getState.isAuth === true) {
      return;
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {},
  },
  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(logout.fulfilled, state => {
      Object.assign(state, initialState);
    });
  },
});

export default slice.reducer;
