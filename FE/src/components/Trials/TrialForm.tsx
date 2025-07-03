import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/axiosInstance";

type TrialFormData = {
  trialName: string;
  description: string;
  period: number;
};

type TrialFormProps = {
  onSuccess: () => void;
};

const TrialForm: React.FC<TrialFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TrialFormData>();

  const onSubmit = async (data: TrialFormData) => {
    const researcherId = JSON.parse(localStorage.getItem("user")).id;
    console.log(researcherId);

    try {
      await axiosInstance.post("/trails", { ...data, researcherId }); // Replace with your actual API endpoint
      reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to submit trial:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
      <div>
        <label className="block mb-1 font-medium">Trial Name</label>
        <input
          {...register("trialName", { required: "Trial name is required" })}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        {errors.trialName && (
          <p className="text-red-500 text-xs">{errors.trialName.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Period (days)</label>
        <input
          type="number"
          {...register("period", {
            required: "Period is required",
            min: { value: 1, message: "Must be at least 1 day" },
          })}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        {errors.period && (
          <p className="text-red-500 text-xs">{errors.period.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default TrialForm;
