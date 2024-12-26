import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layout/Layout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ThemeProvider } from "./context/ThemeContext";
import AuthProvider from "./provider/AuthProvider";
import AddService from "./Components/AddService";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AllService from "./Components/AllService";
import ServiceDetails from "./Components/ServiceDetails";
import BookingServices from "./Components/BookingServices";
import ManageService from "./Components/ManageService";
import ServiceToDo from "./Components/ServiceToDo";
import Error from "./Error/Error";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/allServices", element: <AllService /> },
      { path: "/addService", element: <PrivateRoute><AddService /></PrivateRoute> },
      { path: "/details/:id", element: <PrivateRoute><ServiceDetails /></PrivateRoute> },
      { path: "/bookedServices", element: <PrivateRoute><BookingServices /></PrivateRoute> },
      { path: "/manageService", element: <PrivateRoute><ManageService /></PrivateRoute> },
      { path: "/serviceToDo", element: <PrivateRoute><ServiceToDo /></PrivateRoute> },
    ],
  },
  {
    path:"*",
    element:<Error></Error>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
