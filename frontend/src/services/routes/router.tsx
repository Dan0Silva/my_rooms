import { createBrowserRouter } from "react-router-dom";

import Home from "../../scenes/Home";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default createRouter;
