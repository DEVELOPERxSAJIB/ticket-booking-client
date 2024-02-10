import { createSlice } from "@reduxjs/toolkit";
import {
  createMovie,
  deleteMovie,
  getAllmovies,
  getSingleMovies,
  updateMovie,
} from "./movieApiSlice";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movie: "",
    message: "",
    error: "",
    loader: false,
    single: "",
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllmovies.pending, (state) => {
        state.movie = null;
        state.message = null;
        state.loader = true;
      })
      .addCase(getAllmovies.fulfilled, (state, action) => {
        state.movie = action.payload.payload.movie;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllmovies.rejected, (state) => {
        state.movie = null;
        state.loader = false;
      })
      .addCase(createMovie.pending, (state) => {
        state.loader = true;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.movie.push(action.payload.payload.movie);
      })
      .addCase(updateMovie.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.movie[
          state.movie.findIndex(
            (item) => item._id === action.payload.payload.movie._id
          )
        ] = action.payload.payload.movie;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.movie = state.movie.filter(
          (data) => data._id !== action.payload.payload.movie._id
        );
      })
      .addCase(getSingleMovies.fulfilled, (state, action) => {
        state.single = action.payload.payload.movie;
      });
  },
});

// selector
export const movieData = (state) => state.movies;

// actions
export const { setMessageEmpty } = movieSlice.actions;

// slice export
export default movieSlice.reducer;
