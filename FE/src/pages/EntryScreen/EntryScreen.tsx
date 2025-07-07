import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EntryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showPatientModal, setShowPatientModal] = useState(false);

  useEffect(()=>{
    localStorage.clear()
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Clinical Trial Management System</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Manage and track clinical trials efficiently. Patients can enroll and monitor their progress, while researchers can oversee trial data and compliance.
      </p>

      <div className="flex space-x-8">
        <div className="bg-white p-6 rounded shadow-md text-center w-64">
          <h2 className="text-xl font-semibold mb-4">I'm a Patient</h2>
          <button
            onClick={() => setShowPatientModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full cursor-pointer"
          >
            Continue
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow-md text-center w-64">
          <h2 className="text-xl font-semibold mb-4">I'm a Researcher</h2>
          <button
            onClick={() => navigate('/login/researcher')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full cursor-pointer"
          >
            Enter Researcher Portal
          </button>
        </div>
      </div>

      {/* Modal */}
      {showPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h3 className="text-xl font-bold mb-4">Patient Access</h3>
            <p className="mb-4 text-gray-600">Choose an option to proceed:</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/login/patient')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register/patient')}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
              >
                Register
              </button>
            </div>
            <button
              onClick={() => setShowPatientModal(false)}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryScreen;