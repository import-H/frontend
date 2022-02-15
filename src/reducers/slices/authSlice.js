import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
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

  async (wdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        ...wdata,
      });
      return response.data.data;
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
  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.abc = payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
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
