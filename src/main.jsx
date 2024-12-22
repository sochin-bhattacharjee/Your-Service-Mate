import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Providers/AuthProvider.jsx';
import Layout from './Layout/Layout';
import Home from './Components/Home.jsx';
import Footer from './Components/Footer.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path: "/register",
        element:<Register></Register>
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
