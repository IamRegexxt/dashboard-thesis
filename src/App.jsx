import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  UsersIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardCard from './components/DashboardCard'
import DiseaseDistribution from './components/DiseaseDistribution'
import PredictionTrends from './components/PredictionTrends'
import ConfidenceAnalysis from './components/ConfidenceAnalysis'
import FeedbackInsights from './components/FeedbackInsights'
import AdminPanel from './components/AdminPanel'
import axiosInstance from './utils/axios'
import imageLogo from './assets/logo4.png';
function Dashboard() {
  const [summaryData, setSummaryData] = useState(null)
  const [predictionData, setPredictionData] = useState(null)
  const [feedbackData, setFeedbackData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('users') || '{}')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, predictionRes, feedbackRes] = await Promise.all([
          axiosInstance.get('/api/analytics/analytics/summary'),
          axiosInstance.get('/api/analytics/analytics/predictions'),
          axiosInstance.get('/api/analytics/analytics/feedback')
        ])

        setSummaryData(summaryRes.data)
        setPredictionData(predictionRes.data)
        setFeedbackData(feedbackRes.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('users')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Bar */}
      <header className="bg-gray-800 rounded-b-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 rounded-full h-10 w-10 flex items-center justify-center">
            <img src={imageLogo} alt="logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-white text-3xl font-bold tracking-wide">CropMD</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-teal-300">
              <ShieldCheckIcon className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Admin: {user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <DashboardCard
            title="Total Users"
            value={summaryData?.total_users || 0}
            icon={<UsersIcon className="h-6 w-6 text-teal-500" />}
          />
          <DashboardCard
            title="Total Predictions"
            value={summaryData?.total_predictions || 0}
            icon={<ChartBarIcon className="h-6 w-6 text-teal-500" />}
          />
          <DashboardCard
            title="Total Feedback"
            value={summaryData?.total_feedback || 0}
            icon={<ChatBubbleLeftRightIcon className="h-6 w-6 text-teal-500" />}
          />
          <DashboardCard
            title="Average Rating"
            value={summaryData?.average_rating?.toFixed(1) || 0}
            icon={<StarIcon className="h-6 w-6 text-teal-500" />}
          />
        </div>

        {/* Admin Panel */}
        <div className="mb-6">
          <AdminPanel />
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Disease Distribution</h3>
            <DiseaseDistribution data={summaryData?.disease_distribution} />
          </div>
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Prediction Trends (Last 30 Days)</h3>
            <PredictionTrends data={predictionData?.predictions_by_day} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confidence Score Distribution</h3>
            <ConfidenceAnalysis data={predictionData?.confidence_distribution} />
          </div>
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rating Distribution</h3>
            <FeedbackInsights 
              ratingDistribution={feedbackData?.rating_distribution}
              ratingByDisease={feedbackData?.rating_by_disease}
              onlyRatingDistribution
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Average Accuracy Rating per Disease</h3>
            <FeedbackInsights 
              ratingDistribution={feedbackData?.rating_distribution}
              ratingByDisease={feedbackData?.rating_by_disease}
              onlyRatingByDisease
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
