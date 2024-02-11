import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

// get all moives
export const getAllmovies = createAsyncThunk("movie/getAllmovies", async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/all-movies`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// create a movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/movie/create-movie`,
        data,
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

// create a movie
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (data) => {
    try {
      const response = await axios.put(
        `${baseUrl}/movie/update-movie/${data._id}`,
        data,
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

// delete movie
export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/movie/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

// get single movie
export const getSingleMovies = createAsyncThunk(
  "movie/getSingleMovies",
  async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/single-movie/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
