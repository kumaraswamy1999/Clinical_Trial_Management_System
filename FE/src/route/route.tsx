import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Header } from "../components/Header";
import Trails from "../pages/trails/Trails";
import path from "path";
import PatientEnrollment from "../components/Enrollments/patientsEnrollments";
import Notifications from "../pages/Notification";

const Register = lazy(() => import("../pages/auth/Register"));
const LoginResearcher = lazy(() => import("../pages/Researcher/LoginResearcher"));
const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));
const UserHomePage = lazy(() => import("../pages/user/UserHomePage"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminHomePage = lazy(() => import("../pages/admin/AdminHomePage"));
const EntryScreen = lazy(()=> import("../pages/EntryScreen/EntryScreen"));
const PatientLogin= lazy(()=>import("../pages/Patient/LoginPatient"));
const PatientRegister= lazy(()=>import("../pages/Patient/RegisterPatient"));

const routes = [
  {path:"/",element:<EntryScreen/>},
  {path:"/notification",element:<Notifications/>},
  { path: "/login/researcher", element: <LoginResearcher /> },
    {path:"/login/patient",element:<PatientLogin/>},
    {path:"/register/patient",element:<PatientRegister/>},

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
        path: "/dashboard",
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
