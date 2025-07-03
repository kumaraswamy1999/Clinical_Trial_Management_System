import React from 'react';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router';
const UserDashboard: React.FC = () => {
    // return (
    //     // <div>
    //     //     <Header>
    //     //         <Outlet />
    //     //     </Header>
    //     // </div>

        
    // );
    return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Patient Enrollment</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Trial Scheduling</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Data Collection</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Monitoring</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-200">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Clinical Trial Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example Cards */}
          <div className="bg-white p-4 rounded shadow">Upcoming Appointments</div>
          <div className="bg-white p-4 rounded shadow">Patient Progress</div>
          <div className="bg-white p-4 rounded shadow">Compliance Reports</div>
        </div>
      </main>
    </div>
  );
};


export default UserDashboard;