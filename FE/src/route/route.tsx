import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Header } from "../components/Header";
import Trails from "../pages/trails/Trails";
import path from "path";
import PatientEnrollment from "../components/Enrollments/patientsEnrollments";

const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));
const UserHomePage = lazy(() => import("../pages/user/UserHomePage"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminHomePage = lazy(() => import("../pages/admin/AdminHomePage"));

const routes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  // {
  //   // give role
  //   element: <ProtectedRoute allowedRoles={["patient"]} />,
  //   children: [],
  // },
  {
    // give role
    element: <ProtectedRoute allowedRoles={["researcher", "patient"]} />,
    children: [
      {
        path: "/",
        element: <AdminDashboard />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "trails", element: <Trails /> },
          { path: "enrollments", element: <PatientEnrollment /> },
        ],
      },
    ],
  },

  { path: "*", element: <Navigate to="/login" replace /> },
];

export default routes;
