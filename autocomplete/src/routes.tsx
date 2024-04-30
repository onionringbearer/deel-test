import { createBrowserRouter } from "react-router-dom";
import DemoPage from "./pages/demo";
import ErrorPage from "./pages/error";

export const routes = {
  home: "/",
};

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <DemoPage />,
    errorElement: <ErrorPage />,
  },
]);
