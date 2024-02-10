import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create a theatre
export const createShow = createAsyncThunk("show/createShow", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:3030/api/v1/show/create-show`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get shows by theatre
export const getShowsByTheatre = createAsyncThunk(
  "show/getShowsByTheatre",
  async (theatreId) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/v1/show/`,
        theatreId,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
);

// get all show
export const getAllShow = createAsyncThunk(
  "show/getShowsByTheatre",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/v1/show/`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);


// delete show from theatre
export const deleteShow = createAsyncThunk("show/deleteShow", async (id) => {
  try {
    
    const response = await axios.delete(`http://localhost:3030/api/v1/show/delete-show/${id}`, {
      withCredentials : true
    })

    return response.data

  } catch (error) {
    throw new Error(error.response.data.message)
  }
})