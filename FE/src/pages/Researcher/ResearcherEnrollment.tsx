import axios from "axios";
import { useEffect, useState } from "react";

export default function ResearcherEnrollments(){
     const [data,setData] = useState([]);
      const researcherId = JSON.parse(localStorage.getItem('user'))._id;
    
       //const researcherId = '64a1f2c9e4b8a2d1c3f9a123';
       const fetchData = async()=>{
        const response = await axios.get(`http://localhost:5000/api/enrollments/getAllEnrollments`);
        console.log(researcherId)
        console.log(response)
        const researcherEnrollments = response.data.payload.filter((x)=>{return x.trialId.researcherId === researcherId});
        console.log(researcherEnrollments)
        setData(researcherEnrollments)
       }
       useEffect(()=>{
        fetchData()
       },[])


       const handleStatus = async(value,id)=>{
            const response = await axios.patch(`http://localhost:5000/api/enrollments/updateEnrollment/${id}`,
                {status:value}
            );
            console.log(response)
             fetchData()
       }

    return(
               <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white p-4">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-600">
            <th className="px-4 py-2 font-medium">Trail Name</th>
            <th className="px-4 py-2 font-medium">patient Name</th>
            <th className="px-4 py-2 font-medium">medical Doc</th>
            <th className="px-4 py-2 font-medium">Enrolled At</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((enrollment, index) => (
            <tr key={index} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">{enrollment.trialId.trialName}</td>
              <td className="px-4 py-2">{enrollment.patientId.name}</td>    
                 <td className="px-4 py-2">
                        <a
                              href={enrollment.medicalDocument}
                              download
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
                            >
                              Download
                            </a>
                 </td>
              <td className="px-4 py-2">{enrollment.createdAt}</td>
              <td className='px-4 py-2' > 
                        {
                            (enrollment.status === 'accepted' || enrollment.status === 'rejected') ? 
                            <div>{enrollment.status}</div>  : <div className="flex flex-col space-y-4 w-40">
                          <button onClick={()=>handleStatus('accepted',enrollment._id)} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            Accept
                          </button>
                          <button onClick={()=>handleStatus('rejected',enrollment._id)} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            Reject
                          </button>
                    </div>
                        }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}