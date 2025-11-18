import axios from 'axios';
import { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
import { Slide, toast } from 'react-toastify';

function Login() {

  const [role, setRole] = useState('seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  function validate() {
    const e = {};

    if (!email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email is required.';
    if (password.length < 6) e.password = 'Password must be at least 6 characters.';

    return e;
  }

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email, password
      }, { withCredentials: true });

      dispatch(setUserData(result.data))
      console.log("login successfully")
      setErrors({});
      setLoading(false);
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      navigate('/');

    } catch (error) {
      setLoading(false);
      const status = error.response?.status;
      if (status === 400 || status === 401) {
        setErrors({ general: 'Invalid email or password' });
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')",
      }}>
      <div className="max-w-3xl w-full rounded-2xl shadow-lg p-6 md:p-5 bg-white opacity-90 ">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2 flex items-center justify-center">Create an account</h1>
        <p className="text-sm text-gray-500 mb-6 flex items-center justify-center">Choose your account type and fill the details to get started.</p>

        {/* roles */}
        <div className="flex gap-2 mb-6 items-center justify-center">
          <button
            onClick={() => setRole('seeker')}
            className={`px-4 py-2 rounded-md font-medium cursor-pointer ${role === 'seeker' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            Job Seeker
          </button>
          <button
            onClick={() => setRole('employer')}
            className={`px-4 py-2 rounded-md font-medium cursor-pointer ${role === 'employer' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            Employer
          </button>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input value={email} onChange={e => setEmail(e.target.value)} className="mt-2 p-2 border rounded-md w-full" placeholder="you@example.com" required />
              {errors.email && <small className="text-red-600">{errors.email}</small>}
            </label>
          </div>

          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <div className="mt-2 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="flex-1 p-2 border rounded-l-md"
                  placeholder="Create a password" />

                <button type="button" onClick={() => setShowPassword(s => !s)} className="px-3 bg-gray-100 border rounded-r-md cursor-pointer">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <small className="text-red-600">{errors.password}</small>}
            </label>
          </div>


          {errors.general && (
            <div className="text-center text-sm text-red-600 -mt-2">{errors.general}</div>
          )}
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogin}
              type="submit"
              disabled={loading}
              className="w-[120px] py-2 rounded-md bg-indigo-600 text-white font-medium disabled:opacity-60 cursor-pointer flex justify-center">
              {loading ? <ClipLoader size={20} /> : "Log in"}
            </button>
          </div>

        </div>

        <hr className="my-6 " />
        <div className="text-sm text-gray-600 flex items-center justify-center">
          Create new account? <span onClick={() => navigate("/signup")} className="text-indigo-600 font-medium cursor-pointer">Sign up</span>
        </div>
      </div>
    </div>
  );
}


export default Login 