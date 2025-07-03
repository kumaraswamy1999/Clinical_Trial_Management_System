import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitUserForm } from '../../redux/actions/registerActions';
import { toast } from "react-toastify";

type FormData = {
  name: string;
  dob: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPatient: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const onSubmit = (data: FormData) => {
    console.log('Registering with:', data);
    // TODO: Add backend integration here
    const inputdata = {...data,role:"patient"}
    delete inputdata?.confirmPassword
    dispatch(submitUserForm({formData:inputdata,navigate,toast}))
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Patient Registration</h2>

        <input
          {...register('name', { required: 'Full name is required' })}
          placeholder="Full Name"
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        <input
          type="date"
          {...register('dob', { required: 'Date of birth is required' })}
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.dob && <p className="text-red-500 text-sm mb-2">{errors.dob.message}</p>}

        <select
          {...register('gender', { required: 'Gender is required' })}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mb-2">{errors.gender.message}</p>}

        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          placeholder="Confirm Password"
          className="w-full mb-2 p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 cursor-pointer"
        >
          Register
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            Already registered?{' '}
            <button
              type="button"
              onClick={() => navigate('/login/patient')}
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Login here
            </button>
          </p>
          <p className="mt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
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

export default RegisterPatient;
