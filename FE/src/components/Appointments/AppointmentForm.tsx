import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/axiosInstance";

type FormValues = {
  apptDate: string;
  patientId: string;
  trialId: string;
};

const AppointmentForm: React.FC = ({ onSuccess, initialData }) => {
  const { patientId, trialId } = initialData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axiosInstance.post("/appointments", {
        apptDate: data.apptDate,
        patientId,
        trialId,
      });
      onSuccess();
      console.log("Appointment booked:", response.data);
      // alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Book Appointment
      </h2>

      <label
        htmlFor="apptDate"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Date
      </label>
      <input
        type="date"
        id="apptDate"
        {...register("apptDate", { required: "Date is required" })}
        className={`w-full px-3 py-2 border ${
          errors.apptDate ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {errors.apptDate && (
        <p className="text-red-500 text-sm mt-1">{errors.apptDate.message}</p>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
