export default function PatientEnrollment(){
    return(
         <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white p-4">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-600">
            <th className="px-4 py-2 font-medium">Trail Name</th>
            <th className="px-4 py-2 font-medium">Description</th>
            <th className="px-4 py-2 font-medium">Period</th>
            <th className="px-4 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
{/*           {trailData.map((trail, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">{trail.trialName}</td>
              <td className="px-4 py-2">{trail.description}</td>
              <td className="px-4 py-2">{trail.period}</td>
              <td className="px-4 py-2">
                <div className="flex items-center space-x-2">
                   <button  onClick={() => setIsModelOpen(true)} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                    Entroll
                  </button>
    
                  <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
    )
}