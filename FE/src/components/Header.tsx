import React, { lazy } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getLoggedInUser, logout } from "../utils/utils";

const AdminSidebar = lazy(() => import('./AdminSidebar'))
const UserSidebar = lazy(() => import('./UserSidebar'))

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userData = getLoggedInUser();
    const username: string = userData.name;
    const role: string = userData.role;

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        toast.success("Logout successful");

    };

    return (
        <div className="flex h-screen">
            {role == "admin" ? <AdminSidebar /> : <UserSidebar />}

            <div className="flex flex-col flex-1">
                <nav className="bg-gray-900 p-4 flex items-center justify-between">
                    <div className="w-1/4" />
                    <div className="flex items-center space-x-8 ml-auto">
                        {/* Notification Icon */}


                        {/* Username */}
                        <h2 className="text-white text-lg">{username}</h2>

                        {/* Logout Icon */}
                        <button
                            onClick={handleLogout}
                            className="text-white hover:cursor-pointer"
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Your main content goes here */}
                <main className="p-4 overflow-y-auto">
                    <h1 className="text-xl font-semibold">{children}</h1>
                </main>
            </div>
        </div>
    );
};
