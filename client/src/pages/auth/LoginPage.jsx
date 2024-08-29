import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MetaData } from '../../components';
import { AuthContext } from '../../context/auth.context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import authService from '../../services/auth.service';

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = (data) => {
    authService
      .login(data)
      .then((response) => {
        const token = response.data.authToken;
        storeToken(token);
        verifyStoredToken(token).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <MetaData title="Olina - Blog | Login" />
      <div className="bg-plum-400 min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
              Sign in to your account
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="mt-8 space-y-6"
            noValidate
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/signup"
                  className="font-medium text-gray-300 hover:text-gray-600"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
