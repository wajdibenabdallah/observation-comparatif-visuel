import * as React from "react";
import { io } from "socket.io-client";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Waiting from "./pages/waiting";
import Compare from "./pages/compare";

export const socket = io("http://localhost:4000");

export const Context = React.createContext({});

export default function App() {
  const [token, setToken] = React.useState<string | null>(null);
  // TODO : Next : try to use Redux instead

  const ProtectedRoutes = () => {
    return token ? <Outlet /> : <Navigate to="/" replace />;
  };

  const router = createBrowserRouter([
    { path: "*", element: <Navigate to="/" replace /> },
    {
      path: "/",
      element: <Waiting />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/compare",
          element: <Compare />,
        },
      ],
    },
  ]);
  return (
    <Context.Provider value={{ token, setToken }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Context.Provider>
  );
}
