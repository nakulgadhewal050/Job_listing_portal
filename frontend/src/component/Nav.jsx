import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaSearch, FaBell, FaBookmark } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

export default function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(s => s.user?.userData)
  const role = userData?.role

  const [openMobile, setOpenMobile] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Anywhere')

  const capitalize = (str) => {
    if (!str) return ''
    const s = String(str).trim()
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, null, { withCredentials: true })
      dispatch(setUserData(null))
      localStorage.removeItem('jwt')
    } catch (err) {
      console.warn('logout error', err)
    }
  }

  const handleSearch = (e) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (location) params.set('loc', location)
    navigate(`/jobs?${params.toString()}`)
    setShowSearch(false)
    setOpenMobile(false)
  }

  return (
    <header className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">JobPortal</Link>
        </div>

        {/* Center: Search + Links */}
        <div className="flex-1 hidden md:flex flex-col justify-center">
          <form onSubmit={handleSearch} className="flex items-center bg-white shadow rounded-lg px-3 py-2 gap-3 mb-2">
            <div className="flex items-center gap-2 border-r pr-3">
              <FaMapMarkerAlt className="text-indigo-500" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="outline-none w-36 text-sm text-gray-700"
                placeholder="Anywhere"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <FaSearch className="text-indigo-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none w-full text-sm text-gray-700"
                placeholder="Search jobs, titles, companies..."
              />
              <button type="submit" className="hidden">Search</button>
            </div>
          </form>
          { userData?.role === 'seeker' && (<nav className="flex items-center justify-center gap-10 text-sm">
            <NavLink to="/jobs" className={({ isActive }) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Jobs</NavLink>
            <NavLink to="/companies" className={({ isActive }) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Companies</NavLink>
            <NavLink to="/post-job" className={({ isActive }) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Internships</NavLink>
          </nav>)}
        </div>

        {/* Right: Icons + Auth/Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/saved')} className="relative p-2 rounded-md hover:bg-gray-100">
              <FaBookmark className="text-gray-700" />
            </button>
            <button onClick={() => navigate('/notifications')} className="relative p-2 rounded-md hover:bg-gray-100">
              <FaBell className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </button>
          </div>

          {userData ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile((s) => !s)}
                className="w-9 h-9 rounded-full overflow-hidden bg-indigo-600 text-white flex items-center justify-center font-semibold cursor-pointer"
                aria-label="Profile menu"
              >
                {userData?.avatarUrl ? (
                  <img src={userData.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  userData?.fullname?.[0]?.toUpperCase() || userData?.name?.[0]?.toUpperCase() || 'U'
                )}
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg p-3 text-sm">
                  <div className="font-medium">{capitalize(userData.fullname || userData.name)}</div>
                  <div className="text-gray-500 text-xs mb-2">{userData.role}</div>
                  <button onClick={() => { navigate('/seekerprofile'); setShowProfile(false); }} className="w-full text-left py-1 hover:bg-gray-50 rounded">Profile</button>
                  {role === 'seeker' && <button onClick={() => { navigate('/applications'); setShowProfile(false); }} className="w-full text-left py-1 hover:bg-gray-50 rounded">My Applications</button>}
                  {role === 'employer' && <button onClick={() => { navigate('/employer/dashboard'); setShowProfile(false); }} className="w-full text-left py-1 hover:bg-gray-50 rounded">Dashboard</button>}
                  <button onClick={handleLogout} className="w-full text-left py-1 text-red-600 hover:bg-gray-50 rounded">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/signup" className="px-3 py-1 rounded-md border text-sm">Sign up</Link>
              <Link to="/login" className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Log in</Link>
            </div>
          )}

          {/* Mobile toggles (search & menu) */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setShowSearch((s) => !s)} className="p-2 rounded-md">
              {showSearch ? <IoCloseSharp size={18} /> : <FaSearch size={16} />}
            </button>
            <button onClick={() => setOpenMobile((s) => !s)} className="p-2 rounded-md border">
              <span className="sr-only">Open menu</span>
              <div className="w-5 h-0.5 bg-gray-800 mb-1" />
              <div className="w-5 h-0.5 bg-gray-800 mb-1" />
              <div className="w-5 h-0.5 bg-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search drawer */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3 pt-2 bg-white border-b">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
            <FaMapMarkerAlt />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or remote" className="outline-none w-28 text-sm" />
            <FaSearch />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs..." className="outline-none flex-1 text-sm" />
            <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Search</button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {openMobile && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 flex flex-col gap-3">
            <NavLink onClick={() => setOpenMobile(false)} to="/jobs" className="py-2">Jobs</NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to="/companies" className="py-2">Companies</NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to="/post-job" className="py-2">Post a Job</NavLink>
            <div className="border-t my-1" />
            {userData ? (
              <>
                <button onClick={() => { navigate('/seekerprofile'); setOpenMobile(false); }} className="py-2 text-left">Profile</button>
                {role === 'seeker' && <button onClick={() => { navigate('/applications'); setOpenMobile(false); }} className="py-2 text-left">My Applications</button>}
                <button onClick={() => { handleLogout(); setOpenMobile(false); }} className="py-2 text-left text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link onClick={() => setOpenMobile(false)} to="/signup" className="py-2">Sign up</Link>
                <Link onClick={() => setOpenMobile(false)} to="/login" className="py-2">Log in</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}


