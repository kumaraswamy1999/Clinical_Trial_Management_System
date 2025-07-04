import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/reusable/Button";
import Loader from "../../components/reusable/Loader";
import { Modal } from "../../components/reusable/Modal";
import TrialForm from "../../components/Trials/TrialForm";
import Enrollment from "../../components/Enrollments/Enrollment";
import { Pagination } from "../../components/reusable/Pagination";
import { getAllAppointments } from "../../api/appointments";
import { formatDateToDDMMYYYY } from "../../utils/utils";

export interface UserQueryParams {
  page?: number;
  limit?: number;
  patientId?: string;
  researcherId?: string;
  sortBy?: string;
  search?: string;
  order?: "asc" | "desc";
}

const Appointments: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let researcherId = "";
  let patientId = "";
  const role = user.role;
  if (role === "researcher") {
    researcherId = user._id;
  } else {
    patientId = user._id;
  }

  const queryParams: UserQueryParams = {
    patientId,
    researcherId,
    page: 1,
    limit: 5,
    // sortBy: "name",
    // order: "asc",
  };

  const [filterOption, setFilterOption] = useState(queryParams);
  const [addapptModal, setAddTrialModal] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [apptDetails, setapptDetails] = useState(null);
  const [trialId, setTrialId] = useState("");
  // const [search, setSearch] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["Appointments", filterOption, addapptModal],
    queryFn: () => getAllAppointments(filterOption),
  });

  const { response } = data || {};
  const { data: apptData, pagination } = response || {};
  const { page, totalPages, limit } = pagination || {};

  const handleClick = () => {
    setAddTrialModal((prev) => !prev);
  };

  const handleEnroll = (status, id) => {
    setIsModelOpen(status);
    setTrialId(id);
  };

  const handleClose = () => {
    setIsModelOpen(false);
  };

  const serialNumber = (index) => (page - 1) * limit + index + 1;

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* <div className="flex justify-between items-center mb-3">
          <input
            type="text"
            placeholder="Search Id..."
            onChange={(e) => {
              // setSearch(e.target.value);
              console.log(e.target.value);
              // setFilterOption((prev) => ({ ...prev, search: e.target.value }));
            }}
            className="w-50 px-3 py-2 border rounded-md text-sm"
          />
          {role === "researcher" ? (
            <Button
              label="Add appt"
              onClick={() => {
                setapptDetails(null);
                handleClick();
              }}
            />
          ) : null}
        </div> */}
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white p-4">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-2 font-medium">SlNo.</th>
                <th className="px-4 py-2 font-medium">Appt Id</th>
                <th className="px-4 py-2 font-medium">apptDate</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apptData.map((appt, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{serialNumber(index)}</td>
                  <td className="px-4 py-2">{appt.apptId}</td>
                  <td className="px-4 py-2">
                    {formatDateToDDMMYYYY(appt.apptDate)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {/* {role === "researcher" ? (
                        <button
                          onClick={() => {
                            setapptDetails(appt);
                            handleClick();
                          }}
                          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(true, appt._id)}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                        >
                          Entroll{" "}
                        </button>
                      )} */}
                      {/* <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                        Delete
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(e) => {
              setFilterOption((prev) => ({ ...prev, page: e }));
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={addapptModal}
        onClose={handleClick}
        title={apptDetails ? "Edit Trial" : "Add Trial"}
      >
        <TrialForm onSuccess={() => handleClick()} initialData={apptDetails} />
      </Modal>
      {/* <Modal
        isOpen={isModalOpen}
        title="Enrollment"
        onClose={() => setIsModelOpen(false)}
      >
        {<Enrollment />} */}
      <Modal isOpen={isModalOpen} title="Enrollment" onClose={handleClose}>
        {
          <Enrollment
            trialId={trialId}
            close={() => {
              handleClose();
            }}
          />
        }
      </Modal>
      {/* </Modal> */}
    </>
  );
};

export default Appointments;
