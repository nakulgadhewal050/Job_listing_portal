import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice.js';

function Signup() {

  const [role, setRole] = useState('seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateCommon() {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required.';
    if (!email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email is required.';
    if (password.length < 6) e.password = 'Password must be at least 8 characters.';
    if (phone && !phone.match(/^\+?[0-9 -]{7,15}$/)) e.phone = 'Enter a valid phone number.';
    return e;
  }

  function passwordStrengthLabel(pw) {
    if (pw.length >= 12 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) return 'Very strong';
    if (pw.length >= 10) return 'Strong';
    if (pw.length >= 8) return 'Okay';
    if (!pw) return '';
    return 'Weak';
  }

  function resetFields() {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setResumeFile(null);
    setResumeName('');
    setHeadline('');
    setCompanyName('');
    setCompanyWebsite('');
    setRoleTitle('');
    setErrors({});
  }

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        fullname: name, email, password, phone, role
      }, { withCredentials: true });
      dispatch(setUserData(result.data))
      console.log("signup successfully")
      setErrors({});
      setLoading(false);
    } catch (error) {
       setLoading(false);
       setErrors({ general: error?.response?.data?.message });
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
          {/* Shared fields */}
          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Full name</span>
              <input value={name} onChange={e => setName(e.target.value)} className="mt-2 p-2 border rounded-md w-full" placeholder="Your full name" required />
              {errors.name && <small className="text-red-600">{errors.name}</small>}
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input value={email} onChange={e => setEmail(e.target.value)} className="mt-2 p-2 border rounded-md w-full" placeholder="you@example.com" required />
              {errors.email && <small className="text-red-600">{errors.email}</small>}
            </label>
          </div>

          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Phone </span>
              <input value={phone} onChange={e => setPhone(e.target.value)} className="mt-2 p-2 border rounded-md w-full" placeholder="+91 98765 43210" required />
              {errors.phone && <small className="text-red-600">{errors.phone}</small>}
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
                  placeholder="Create a password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="px-3 bg-gray-100 border rounded-r-md cursor-pointer">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              <div className="mt-1 text-xs text-gray-500">{password ? `Strength: ${passwordStrengthLabel(password)}` : 'Add numbers and symbols for stronger password.'}</div>
              {errors.password && <small className="text-red-600">{errors.password}</small>}
            </label>
          </div>


          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleSignup}
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium disabled:opacity-60 cursor-pointer">
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <button type="button" onClick={resetFields} className="px-4 py-2 rounded-md border cursor-pointer">Reset</button>
          </div>

        </div>

        <hr className="my-6 " />
        <div className="text-sm text-gray-600 flex items-center justify-center">
          Already have an account? <span className="text-indigo-600 font-medium"
            onClick={() => navigate("/login")}
          >Log in</span>
        </div>
      </div>
    </div>
  );
}


export default Signup 