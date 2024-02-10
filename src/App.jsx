import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUserData } from "./features/user/userApiSlice";
import route from "./routes/route";
import { getAllmovies } from "./features/movie/movieApiSlice";
import { getAllTheatre } from "./features/theatre/theatreApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUserData());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllmovies());
    dispatch(getAllTheatre());
  })

  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  );
}

export default App;
