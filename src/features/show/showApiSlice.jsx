import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// create a theatre
export const createShow = createAsyncThunk("show/createShow", async (data) => {
  try {
    const response = await axios.post(
      `${baseUrl}/show/create-show`,
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
        `${baseUrl}/show/`,
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
        `${baseUrl}/show/`,
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
    
    const response = await axios.delete(`${baseUrl}/show/delete-show/${id}`, {
      withCredentials : true
    })

    return response.data

  } catch (error) {
    throw new Error(error.response.data.message)
  }
})