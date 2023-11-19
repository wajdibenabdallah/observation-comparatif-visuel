import * as React from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Navigate,
  redirect,
} from "react-router-dom";

import Waiting from "./pages/waiting";
import Compare from "./pages/compare";
import { io } from "socket.io-client";

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);
  const socket = io("http://localhost:4000");

  const ProtectedRoutes = () => {
    return token ? <Outlet /> : <Navigate to="/" replace />;
  };

  const router = createBrowserRouter([
    { path: "*", element: <Navigate to="/" replace /> },
    {
      path: "/",
      element: <Waiting socket={socket} setToken={setToken} />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/compare",
          element: <Compare setToken={setToken} />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
