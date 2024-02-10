import Layout from "../components/Layout/Layout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Forget from "../pages/Forget/Forgot";
import PublicGuard from "./PublicGuard";

const publicRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PublicGuard />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/forget",
            element: <Forget />,
          },
        ],
      },
    ],
  },
];

export default publicRoutes;
