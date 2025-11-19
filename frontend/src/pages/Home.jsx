import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBriefcase, FaUsers, FaRocket, FaCheckCircle, FaSearch, FaBuilding, FaChartLine, FaShieldAlt } from 'react-icons/fa'
import Nav from '../component/Nav'

function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FaSearch className="text-4xl text-indigo-600" />,
      title: "Smart Job Search",
      description: "Find your dream job with advanced filters and personalized recommendations"
    },
    {
      icon: <FaUsers className="text-4xl text-purple-600" />,
      title: "Connect with Employers",
      description: "Direct communication with top companies looking for talent like you"
    },
    {
      icon: <FaRocket className="text-4xl text-pink-600" />,
      title: "Fast Applications",
      description: "Apply to multiple jobs with one click using your saved profile"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      title: "Track Progress",
      description: "Monitor your applications and get real-time status updates"
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Jobs" },
    { number: "5K+", label: "Companies" },
    { number: "50K+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Sign up and build your professional profile in minutes"
    },
    {
      step: "2",
      title: "Search & Apply",
      description: "Browse jobs and apply with your customized cover letter"
    },
    {
      step: "3",
      title: "Get Hired",
      description: "Connect with employers and land your dream job"
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with top employers and discover opportunities that match your skills and aspirations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
              >
                Get Started - It's Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-indigo-600 transform hover:scale-105 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                <p className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to accelerate your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-2xl text-2xl font-bold mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-linear-to-r from-indigo-600 to-purple-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Are You an Employer?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Post jobs, manage applications, and find the perfect candidates for your team
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="text-2xl shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Easy Job Posting</h3>
                    <p className="text-white/80">Create and manage job listings in minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="text-2xl shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Application Management</h3>
                    <p className="text-white/80">Review, filter, and track all applications in one place</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="text-2xl shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Quality Candidates</h3>
                    <p className="text-white/80">Access a pool of verified, talented professionals</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
              >
                Post a Job Now
              </button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                    <FaBuilding className="text-3xl text-white" />
                    <div className="text-white">
                      <p className="font-semibold">500+ Companies</p>
                      <p className="text-sm text-white/80">Trust our platform</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                    <FaUsers className="text-3xl text-white" />
                    <div className="text-white">
                      <p className="font-semibold">50K+ Applications</p>
                      <p className="text-sm text-white/80">Processed monthly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4">
                    <FaShieldAlt className="text-3xl text-white" />
                    <div className="text-white">
                      <p className="font-semibold">Secure & Verified</p>
                      <p className="text-sm text-white/80">All profiles checked</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers and employers on JobPortal today
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-10 py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all cursor-pointer"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaBriefcase className="text-2xl text-indigo-400" />
                <span className="text-2xl font-bold">JobPortal</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Browse Jobs</li>
                <li className="hover:text-white cursor-pointer">Career Advice</li>
                <li className="hover:text-white cursor-pointer">Resume Tips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">Post a Job</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Employer Resources</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home