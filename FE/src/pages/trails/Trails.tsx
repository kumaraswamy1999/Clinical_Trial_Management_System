import React, { useState } from "react";
import { Table } from "../../components/reusable/Table";
import { useQuery } from "@tanstack/react-query";
import { getAllTrails } from "../../api/trails";
import { Button } from "../../components/reusable/Button";
import Loader from "../../components/reusable/Loader";
import { Modal } from "../../components/reusable/Modal";
import TrialForm from "../../components/Trials/TrialForm";
import Enrollment from "../../components/Enrollments/Enrollment";

export interface UserQueryParams {
  page?: number;
  limit?: number;
  researcherId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

const tableCoulmns = [
  { label: "Trial Name", key: "trialName" },
  { label: "Description", key: "description" },
  { label: "Period", key: "period" },
];

const Trails: React.FC = () => {
  const queryParams: UserQueryParams = {
    // researcherId: "64a1f2c9e4b8a2d1c3f9a133",
    page: 1,
    limit: 2,
    // search: "john",
    // sortBy: "name",
    // order: "asc",
  };

  const [filterOption, setFilterOption] = useState(queryParams);
  const [addTrailModal, setAddTrialModal] = useState(false);
  const [isModalOpen,setIsModelOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["trails", filterOption],
    queryFn: () => getAllTrails(filterOption),
  });

  const { response } = data || {};
  const { data: trailData, pagination } = response || {};
  const { page, totalPages } = pagination || {};

  const handleClick = () => {
    setAddTrialModal((prev) => !prev);
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
         {" "}
      <div className="min-h-screen bg-gray-50 p-6">
              {/* Header with Button on the Right */}
             {" "}
        <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold">{}</h1>
                  <Button label="Add Trail" onClick={handleClick} />
               {" "}
        </div>
        {/* <Button label="Add Trail" onClick={handleClick} /> */}
        {/* <Table
          data={trailData}
          columns={tableCoulmns}
          page={page}
          totalPages={totalPages}
          // sortKey={"title"}
          onPageChange={(e) => {
            setFilterOption((prev) => ({
              ...prev,
              page: e,
            }));
          }}
        /> */}
    

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
          {trailData.map((trail, index) => (
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
          ))}
        </tbody>
      </table>
    </div>

      </div>
      <Modal isOpen={addTrailModal} onClose={handleClick} title="Add Trial">
        <TrialForm onSuccess={() => handleClick()} />
      </Modal>
      <Modal isOpen={isModalOpen} title="Enrollment" onClose={()=>setIsModelOpen(false)}>{<Enrollment/>}</Modal>
    </>
  );
};

export default Trails;
