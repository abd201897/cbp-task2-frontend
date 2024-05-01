import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { PrivateLayout } from "../../layout";
import PublicLayout from "../../layout/PublicLayout";
import { useAuth } from "../store/authContext";
import { About, Error, Login, RegisterStudent } from "../../pages/public";
import { Contact, Courses, Home } from "../../pages/private";
import Profile from "../../pages/private/Profile";
import React from "react";
import Registrations from "../../pages/private/Registrations";
import ForgetPassword from "../../pages/public/Forget";

function Routes() {
  const { user } = useAuth();
  const isAuthenticated = user || user?.access_token;
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <PrivateLayout /> : <PublicLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "courses",
          element: <ProtectedRoute component={<Courses />} />,
        },
        {
          path: "profile",
          element: <ProtectedRoute component={<Profile />} />,
        },
        {
          path: "registrations",
          element: <ProtectedRoute component={<Registrations />} />,
        },
        {
          path: "login",
          element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
        },
        {
          path: "register",
          element: user ? <Navigate to="/" replace /> : <RegisterStudent />,
        },
      ],
    },
    {
      path: "*",
      element: <div>not found</div>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;

const ProtectedRoute = ({ component }) => {
  const { user } = useAuth();
  const isAuthenticated = user || user?.access_token;

  if (isAuthenticated) {
    return component;
  }
  return <Login />;
};
ProtectedRoute.propTypes = {
  component: React.Component,
};
