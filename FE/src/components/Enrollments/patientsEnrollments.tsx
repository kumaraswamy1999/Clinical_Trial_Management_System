import axios from "axios";
import { useEffect, useState } from "react"

export default function PatientEnrollment(){
   const [data,setData] = useState([]);

   //const patientId = '6866193fae03b944dea9e3a9';
   const patientId = JSON.parse(localStorage.getItem('user'))._id;
   const fetchData = async()=>{
    const response = await axios.get(`http://localhost:5000/api/enrollments/getPatientEnrollment/${patientId}`);
    setData(response.data.payload)
   }
   useEffect(()=>{
    fetchData()
   },[])
    return(
         <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white p-4">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-600">
            <th className="px-4 py-2 font-medium">Trail Name</th>
            <th className="px-4 py-2 font-medium">Trial Description</th>
            <th className="px-4 py-2 font-medium">Enrolled At</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((enrollment, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">{enrollment.trialId.trialName}</td>
              <td className="px-4 py-2">{enrollment.trialId.description}</td>
              <td className="px-4 py-2">{enrollment.createdAt}</td>
              <td className='px-4 py-2' >{enrollment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}