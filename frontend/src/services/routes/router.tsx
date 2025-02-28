import { createBrowserRouter } from "react-router-dom";

import Home from "../../scenes/Home";
import Space from "../../scenes/Space";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/spaces/:id",
    element: <Space />,
  },
]);

export default createRouter;
