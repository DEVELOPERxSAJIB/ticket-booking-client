import { createSlice } from "@reduxjs/toolkit";
import { createShow, deleteShow, getShowsByTheatre } from "./showApiSlice";

const showSlice = createSlice({
  name: "show",
  initialState: {
    show: [],
    message: "",
    error: "",
    loader: "",
  },

  reducers: {
    showsMessageNull: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createShow.pending, (state) => {
        state.loader = true;
      })
      .addCase(createShow.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.show.push(action.payload.payload.show);
      })
      .addCase(createShow.rejected, (state, action) => {
        (state.loader = false), (state.error = action.error.message);
      })
      .addCase(getShowsByTheatre.pending, (state) => {
        state.loader = true;
        state.show = [];
      })
      .addCase(getShowsByTheatre.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.show = action.payload.payload.show;
      })
      .addCase(getShowsByTheatre.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload.message;
        state.show = null;
      })
      .addCase(deleteShow.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteShow.fulfilled, (state, action) => {
        state.loader = false;
        state.show = state.show.filter(
          (data) => data._id !== action.payload.payload.show._id
        );
        state.message = action.payload.message
      });
  },
});

// selector

// actions
export const { showsMessageNull } = showSlice.actions;

// default export
export default showSlice.reducer;
