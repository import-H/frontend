import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
// 임시로 refreshToken도 여기에 저장해둠

const initialState = {
  status: null,
  userId: "",
  isAuth: false,
};

// 로그인
export const login = createAsyncThunk(
  "auth/login",

  async (wdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/v1/login`, {
        ...wdata,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data.data));
      const userData = jwt_decode(response.data.data.accessToken);
      //console.log(response.data.data, userData);
      return userData;
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

// 회원가입
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

// 로그아웃
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.clear();
  location.reload();
});

// oauth
export const oauth = createAsyncThunk("auth/oauth", async data => {
  const { provider, code } = data;
  const response = await axios.get(
    `${API_URL}/v1/social/${provider}?code=${code}`,
  );
  console.log(response);

  localStorage.setItem("authTokens", JSON.stringify(response.data.data));
  const userData = jwt_decode(response.data.data.accessToken);
  console.log(userData);
  return { userData: userData, isNew: response.data.data.new };
});

// oauth 회원가입 시, pathId 생성
export const oauthAddInfo = createAsyncThunk(
  "auth/oauthAddInfo",
  async data => {
    const { userId, pathId } = data;
    const response = await axios.put(
      `${API_URL}/v1/users/${userId}/path-id`,
      pathId,
    );
  },
);

// 인증 이메일 확인

// 인증 이메일 재전송
export const reEmailAuth = createAsyncThunk("auth/oauthAddInfo", async () => {
  await axiosInstance.post(`${API_URL}/v1/email-token`);
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: state => {
      state.user = jwt_decode(
        JSON.parse(localStorage.getItem("authTokens")).accessToken,
      );
    },
    logout: (state, action) => {},
  },
  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.userId = payload.sub;
      state.roles = payload.roles;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(oauth.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.isNew = payload.isNew.isNew;
      state.userId = payload.userData.sub;
      state.roles = payload.userData.roles;
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

const { actions, reducer } = slice;
export const { updateUser } = actions;
export default reducer;
