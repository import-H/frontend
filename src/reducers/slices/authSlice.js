import { createSlice } from "@reduxjs/toolkit";

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
export const { getMoreComments } = slice.actions;

export function register(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await dispatch(slice.actions.registerSuccess(data));
  };
}
