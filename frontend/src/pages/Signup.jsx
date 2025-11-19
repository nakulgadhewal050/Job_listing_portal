import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye, FaUser, FaEnvelope, FaPhone, FaLock, FaBriefcase, FaUserTie } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice.js';
import { ClipLoader } from 'react-spinners';
import { Slide, toast } from 'react-toastify';

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

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required.';
    if (!email.match(/^\S+@\S+\.\S+$/)) e.email = 'Valid email is required.';
    if (password.length < 6) e.password = 'Password must be at least 8 characters.';
    if (phone.length < 10 && !phone.match(/^\+?[0-9 -]{7,15}$/)) e.phone = 'Enter a valid phone number.';
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
    setErrors({});
  }

  const handleSignup = async () => {
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        fullname: name, email, password, phone, role
      }, { withCredentials: true });
      dispatch(setUserData(result.data))
      console.log("signup successfully")
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
      setErrors({ general: error?.response?.data?.message });
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <FaUserTie className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join our platform and start your journey</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`group relative px-4 py-4 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                  role === 'seeker'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <div className="flex flex-col items-center gap-2">
                  <FaBriefcase className="text-xl" />
                  <span>Job Seeker</span>
                </div>
                {role === 'seeker' && (
                  <div className="absolute inset-0 rounded-xl bg-white opacity-20 animate-pulse"></div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`group relative px-4 py-4 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                  role === 'employer'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <div className="flex flex-col items-center gap-2">
                  <FaUserTie className="text-xl" />
                  <span>Employer</span>
                </div>
                {role === 'employer' && (
                  <div className="absolute inset-0 rounded-xl bg-white opacity-20 animate-pulse"></div>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
              {errors.name && <small className="text-red-500 text-xs mt-1">{errors.name}</small>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <small className="text-red-500 text-xs mt-1">{errors.email}</small>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              {errors.phone && <small className="text-red-500 text-xs mt-1">{errors.phone}</small>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Password strength:</span>
                    <span className={`font-medium ${
                      passwordStrengthLabel(password) === 'Very strong' ? 'text-green-600' :
                      passwordStrengthLabel(password) === 'Strong' ? 'text-blue-600' :
                      passwordStrengthLabel(password) === 'Okay' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{passwordStrengthLabel(password)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${
                      passwordStrengthLabel(password) === 'Very strong' ? 'w-full bg-green-500' :
                      passwordStrengthLabel(password) === 'Strong' ? 'w-3/4 bg-blue-500' :
                      passwordStrengthLabel(password) === 'Okay' ? 'w-1/2 bg-yellow-500' : 'w-1/4 bg-red-500'
                    }`}></div>
                  </div>
                </div>
              )}
              {errors.password && <small className="text-red-500 text-xs mt-1">{errors.password}</small>}
            </div>
          </div>

          {errors.general && (
            <div className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
              {errors.general}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSignup}
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <ClipLoader size={20} color="white" />
                  <span>Creating...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <button
              type="button"
              onClick={resetFields}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all cursor-pointer">
              Reset
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 font-semibold hover:text-purple-600 transition-colors cursor-pointer">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup 