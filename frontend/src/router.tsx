import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Admin from "./Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);
