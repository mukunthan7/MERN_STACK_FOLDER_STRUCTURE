import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { createBrowserRouter } from "react-router-dom";
import CheckAuth from "./util/CheckAuth";
import Guest from "./util/Guest";

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />,
          </Guest>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
