import { createSlice } from "@reduxjs/toolkit";
import {
  getLoggedInUserData,
  loginUser,
  userLogOut,
  userRegistration,
} from "./userApiSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.loader = true;
      })
      .addCase(userRegistration.rejected, (state, actions) => {
        state.error = actions.error.message;
        state.loader = false;
      })
      .addCase(userRegistration.fulfilled, (state, actions) => {
        state.message = actions.payload.message;
        state.loader = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.error = actions.error.message;
        state.loader = false;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.message = actions.payload.message;
        state.user = actions.payload.payload.user;
        localStorage.setItem(
          "user",
          JSON.stringify(actions.payload.payload.user)
        );
        state.loader = false;
      })
      .addCase(userLogOut.pending, (state) => {
        state.loader = true;
      })
      .addCase(userLogOut.fulfilled, (state, actions) => {
        state.loader = false;
        state.user = null;
        state.message = actions.payload.message;
        localStorage.removeItem("user");
      })
      .addCase(getLoggedInUserData.rejected, (state, actions) => {
        state.loader = false
        state.error = actions.error.message;
        state.user = null
      })
      .addCase(getLoggedInUserData.fulfilled, (state, actions) => {
        state.loader = false
        state.message = actions.payload.message;
        state.user = actions.payload.user;
      });
  },
});

// selector

// actions
export const { setMessageEmpty } = userSlice.actions;

// export default
export default userSlice.reducer;
