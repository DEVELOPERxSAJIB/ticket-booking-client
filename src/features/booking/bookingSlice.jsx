import { createSlice } from "@reduxjs/toolkit";
import { bookSeats, makePayment } from "./bookingApiSlice";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingID: "",
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
      .addCase(makePayment.pending, (state) => {
        state.loader = true;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.bookingID = action.payload.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loader = false,
        state.message = action.error.message 
      })
      .addCase(bookSeats.pending, (state) => {
        state.loader = true;
      })
      .addCase(bookSeats.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.loader = false,
        state.message = action.error.message 
      })
  },
});

// export movie
export const bookingData = (state) => state.bookings;

// actions
export const { setMessageEmpty } = bookingSlice.actions;

// slice export
export default bookingSlice.reducer;
