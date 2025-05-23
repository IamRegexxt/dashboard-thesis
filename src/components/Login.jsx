import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo4.png'
import farmImage from '../assets/sap.jpg'; // adjust the path as needed
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        email,
        password
      });

      // Debug: log the response
      console.log('Login response:', response.data);

      // Store the token and user in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Debug: log the user object being stored
      console.log('User stored in localStorage:', response.data.user);

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
  className="min-h-screen w-full flex items-center justify-center relative"
  style={{
    backgroundImage: `url(${farmImage})`,
    backgroundColor: '#e0f2f1',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }}
>
  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-gray-19 bg-opacity-40" />

  {/* Glassmorphism Card */}
  <div className="relative z-10 w-full max-w-sm min-h-[700px] rounded-2xl shadow-2xl backdrop-blur-md bg-white/30 border border-white/30 p-6 flex flex-col justify-center items-center">
    <div className="flex flex-col items-center mb-8">
      <div className="h-20 w-20 mb-6 rounded-full bg-white/70 flex items-center justify-center shadow">
        <img src={logo} alt="logo" className="h-16 w-16 object-contain" />
      </div>
      <h2 className="text-2xl font-bold text-white drop-shadow text-center tracking-wide mb-8">
        ADMIN
      </h2>
    </div>

    <form className="w-4/5 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      <div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <UserIcon className="h-5 w-5 text-green-600" />
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="block w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 border border-green-200 focus:border-green-500 focus:ring-green-500 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <LockClosedIcon className="h-5 w-5 text-green-600" />
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 border border-green-200 focus:border-green-500 focus:ring-green-500 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 text-white font-bold shadow-md hover:from-green-700 hover:to-lime-600 transition disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  </div>
</div>

  )
}

export default Login 