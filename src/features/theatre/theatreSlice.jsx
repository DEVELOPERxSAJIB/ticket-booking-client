import { createSlice } from "@reduxjs/toolkit";
import {
  createTheatre,
  deleteTheatre,
  findUniqueTheatre,
  getAllTheatre,
  getTheatreByOwner,
  updateTheatreStatus,
} from "./theatreApiSlice";

const theatreSlice = createSlice({
  name: "theatre",
  initialState: {
    theatre: [],
    alltheatre : [],
    message: "",
    error: "",
    loader: "",
  },

  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTheatre.fulfilled, (state, action) => {
        (state.loader = false), (state.message = action.payload.message);
        state.alltheatre = action.payload.payload.theatre;
      })
      .addCase(getAllTheatre.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTheatre.fulfilled, (state, action) => {
        (state.loader = false), (state.message = action.payload.message);
        state.theatre.push(action.payload.payload.theatre);
      })
      .addCase(createTheatre.rejected, (state, action) => {
        (state.loader = false), (state.error = action.error.message);
      })
      .addCase(updateTheatreStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTheatreStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.alltheatre[
          state.alltheatre.findIndex(
            (data) => data._id === action.payload.payload.theatre._id
          )
        ] = action.payload.payload.theatre;
      })
      .addCase(deleteTheatre.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTheatre.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.theatre = state.theatre.filter(
          (data) => data._id !== action.payload.payload.theatre._id
        );
      })
      .addCase(getTheatreByOwner.pending, (state) => {
        state.loader = true
      })
      .addCase(getTheatreByOwner.fulfilled, (state, action) => {
        state.loader = false,
        state.theatre = action.payload.payload.theatre
      })
      .addCase(getTheatreByOwner.rejected, (state) => {
        state.loader = false
        state.theatre = null
      })
      .addCase(findUniqueTheatre.pending, (state) => {
        state.loader = true
      })
      .addCase(findUniqueTheatre.fulfilled, (state, action) => {
        state.loader = false,
        state.theatre = action.payload.payload
      })
      .addCase(findUniqueTheatre.rejected, (state, action) => {
        state.loader = false,
        state.error = action.error.message
      })
  },
});

// selector
export const theatreStateData = (state) => state.theatres;

// actions
export const { setMessageEmpty } = theatreSlice.actions;

// default export
export default theatreSlice.reducer;
