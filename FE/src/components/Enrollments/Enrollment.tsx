
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";



const validationSchema = Yup.object().shape({
  patientId: Yup.string().required("Patient Id is required"),
  trialId: Yup.string().required("Trial Id is required"),
  doc: Yup.mixed()
    .required("Medical Document is Required")
    .test(
      "fileRequired",
      "Medical document is required",
      (value) => value instanceof File
    ),
  status: Yup.string().required("Patient Id is required"),
});

interface formValues {
  patientId: string;
  trialId: string;
  doc: File | null;
  status: string;
}
export default function Enrollment({trialId,close}) {
  const [message,setMessage] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const patientId = JSON.parse(localStorage.getItem('user'))._id;
  const formik = useFormik<formValues>({
    initialValues: {
      //patientId: "6866193fae03b944dea9e3a9",
      patientId:patientId,
      trialId: trialId,
      doc: null,
      status: "enrolled",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("patientId", values.patientId);
      formData.append("trialId", values.trialId);
      if (values.doc) {
        formData.append("doc", values.doc);
      }
      formData.append("status", values.status);
      for (const [key, val] of formData.entries()) {
        console.log(`${key}`, val);
      }
      try{
        const response = await axios.post(
        "http://localhost:5000/api/enrollments/createEnrollment",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if(response.status === 201){
           setMessage(response.data.message)
          close();
      }

      }
      catch(err){
        setErrorMessage(err.response.data.message)
       console.log(err)
      }
      
    },
  });
  return (
    <>
    {message && <div className="text-green-500">{message}</div>}
     {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
      >
        {/* <div className="mb-4">
          <label
            htmlFor="patientId"
            className="block text-sm font-medium text-gray-700"
          >
            Patient ID
          </label>
          <input
            id="patientId"
            name="patientId"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.patientId}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {formik.touched.patientId && formik.errors.patientId && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.patientId}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="trialId"
            className="block text-sm font-medium text-gray-700"
          >
            Trial ID
          </label>
          <input
            id="trialId"
            name="trialId"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={trialId}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {formik.touched.trialId && formik.errors.trialId && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.trialId}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <input
            id="status"
            name="status"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {formik.touched.status && formik.errors.status && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.status}
            </div>
          )}
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="doc"
            className="block text-sm font-medium text-gray-700"
          >
            Medical Document
          </label>
          <input
            id="doc"
            name="doc"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("doc", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {formik.touched.doc && typeof formik.errors.doc === "string" && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.doc}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </>
  );
}