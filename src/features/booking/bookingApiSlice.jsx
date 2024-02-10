import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// make payment
export const makePayment = createAsyncThunk(
  "booking/makePayment",
  async ({ amount, token }) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/v1/booking/make-payment`,
        { amount, token },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// book seat
export const bookSeats = createAsyncThunk(
  "booking/bookSeat",
  async (payload) => {
    try {
      const response = await axios
        .post(`http://localhost:3030/api/v1/booking/book-show`, payload, {
          withCredentials: true,
        })
        

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
