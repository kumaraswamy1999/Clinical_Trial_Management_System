import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitLoginForm } from "../../redux/actions/loginActions";
import { useAppDispatch } from "../../redux/hooks/hooks";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPatient: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Logging in with:", data);
    const inputData = {...data,role:"patient"}
    console.log(inputData)
    dispatch(submitLoginForm({formData:inputData,navigate,toast}))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Patient Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            Not registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/register/patient")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register here
            </button>
          </p>
          <p className="mt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-500 hover:underline cursor-pointer"
            >
              ← Back to Home
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPatient;
