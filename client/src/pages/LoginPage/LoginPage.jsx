import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import authService from '../../services/auth.service';
import { useForm } from '../../hooks/useForm';

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { onInputChange, email, password } = useForm({
    email: '',
    password: '',
  });

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    authService
      .login(requestBody)
      .then((response) => {

        const token = response.data.authToken;
        storeToken(token);


        verifyStoredToken(token).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/signup"
                  className="font-medium text-gray-700 hover:text-gray-600"
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

export default LoginPage;
