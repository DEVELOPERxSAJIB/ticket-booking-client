import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import movieSlice from "../features/movie/movieSlice";
import theatreSlice from "../features/theatre/theatreSlice";
import showSlice from "../features/show/showSlice";
import bookingSlice from "../features/booking/bookingSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    movies: movieSlice,
    theatres : theatreSlice,
    shows : showSlice,
    bookings : bookingSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
