import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";

const route = createBrowserRouter([...privateRoutes, ...publicRoutes]);

export default route;
