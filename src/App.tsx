import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Waiting from "./pages/waiting";
import Compare from "./pages/main";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Waiting,
    },
    {
      path: "/compare",
      Component: Compare,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
