import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../../components/ProtectedRoute";

import Home from "../../scenes/Home";
import Space from "../../scenes/Space";
import Dashboard from "../../scenes/Dashboard";
import NotFound from "../../scenes/NotFound";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/spaces/:id",
    element: <Space />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [{
      path: "",
      element: <Dashboard />
    }],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default createRouter;
