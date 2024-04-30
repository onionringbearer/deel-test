import { createBrowserRouter } from "react-router-dom";
import DemoPage from "./pages/demo";

export const routes = {
  home: "/",
};

export const router = createBrowserRouter([
  { path: routes.home, element: <DemoPage /> },
]);
