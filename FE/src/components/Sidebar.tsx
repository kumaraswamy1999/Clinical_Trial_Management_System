import React, { useState } from "react";
import { NavLink } from "react-router";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const role = JSON.parse(localStorage.getItem("user")).role;

  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  interface SidebarItem {
    name: string;
    path: string;
    icon?: React.ReactNode; // Optional icon
    children?: SidebarItem[]; // Optional for nested items
  }

  const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Trials", path: "/dashboard/trails" },
    { name: "Enrollment", path:role === 'patient' ? `/dashboard/enrollments` : 'researcherEnrollments' },
  ];

  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <button onClick={toggleSidebar} className="p-4 bg-gray-900">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
          {isOpen && <p className="text-white text-lg ">Dashboard</p>}
        </div>
      </button>

      <div
        className={`flex flex-col ${isOpen ? "block" : "hidden"} md:block p-6`}
      >
        {sidebarItems.map(({ name, path }: SidebarItem, index) => (
          <NavLink
            key={index}
            to={path}
            className="mb-2 text-center hover:bg-blue-500 bg-gray-800 px-4 py-2 mb-6 rounded"
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
