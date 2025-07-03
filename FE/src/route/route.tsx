import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Header } from "../components/Header";

const Register = lazy(() => import('../pages/auth/Register'));
const Login = lazy(() => import('../pages/auth/Login'));
const UserDashboard = lazy(() => import('../pages/user/UserDashboard'));
const UserHomePage = lazy(() => import('../pages/user/UserHomePage'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminHomePage = lazy(() => import('../pages/admin/AdminHomePage'));

const routes = [
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    {path:"/dashboard",element:<UserDashboard/>},

    // {
    //     // give role
    //     element: <ProtectedRoute allowedRoles={["staff"]} />,
    //     children: [
    //         {
    //             path: "/dashboard",
    //             element: <UserDashboard />,
    //             children: [{ index: true, element: <UserHomePage /> }],
    //         },
    //     ],
    // },
    {
        // give role
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                path: "/admin-dashboard",
                element: <AdminDashboard />,
                children: [{ index: true, element: <AdminHomePage /> }],
            },
        ],
    },

    { path: "*", element: <Navigate to="/login" replace /> },
];

export default routes;
