import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import PrivateGuard from "./PrivateGuard";
import Profile from "../pages/Profile/Profile";
import Singlemovie from "../pages/Singlemovie/Singlemovie";
import Allmovies from "../pages/Allmovies/Allmovies";
import GetTickets from "../pages/GetTickets/GetTickets";

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path : "/",
            element : <Home />
          }, 
          {
            path : "/all-movies",
            element : <Allmovies />
          }, 
          {
            path : "/all-movies/:id",
            element : <Singlemovie />
          }, 
          {
            path : "/dashboard",
            element : <Dashboard />
          }, 
          {
            path : "/profile",
            element : <Profile />
          },
          {
            path : "/get-tickets",
            element : <GetTickets />
          },
          {
            path : "/get-tickets/:id",
            element : <GetTickets />
          }
        ],
      },
    ],
  },
];

export default privateRoutes;
