import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  login: false
};

const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    }
  }
});

export default slice.reducer;

// export function register(data) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     await dispatch(slice.actions.registerSuccess(data));
//   };
// }

export function register(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      await axios.post("http://localhost:3001/user", {
        id: 2,
        ...data
      });
      //console.log("res", response);
    } catch (e) {
      console.log(e);
    }
  };
}

export function login() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get("http://localhost:3001/user?id=1");
      console.log("res", response);
    } catch (e) {
      console.log(e);
    }
  };
}
