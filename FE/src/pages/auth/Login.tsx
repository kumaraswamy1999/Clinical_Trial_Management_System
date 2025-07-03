import React from "react";
import { Formik, Form, type FormikHelpers } from "formik";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../../validators/validators";
import { Input } from "../../components/reusable/Input";
import { Button } from "../../components/reusable/Button";
import { loginApi } from "../../api/api";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { data } = await loginApi(values.email, values.password);
      localStorage.setItem("user", JSON.stringify(data));

      if (data?.token) {
        toast.success("Login Successful");
        navigate(data.role === "admin" ? "/admin-dashboard" : "/dashboard");
      } else {
        setStatus("Invalid email or password");
      }
    } catch (error) {
      setStatus("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  

  
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
        </form>
      </div>
    </div>
  );

};

export default Login;
