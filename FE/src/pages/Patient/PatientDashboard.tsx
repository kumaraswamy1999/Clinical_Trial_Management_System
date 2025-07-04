import { Link, Outlet } from "react-router";

export default function PatientDashboard(){
    return(
         <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <Link to='trials' className="block p-2 rounded hover:bg-gray-200">trials</Link>
          <Link to="enrollments" className="block p-2 rounded hover:bg-gray-200">enrollments</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
            <Outlet/>
      </main>
    </div>
    )
}