import React, { useEffect, useState } from 'react';
import { UsersIcon, ChartBarIcon, ChatBubbleLeftRightIcon, StarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../utils/axios';
import DiseaseDistribution from './DiseaseDistribution';
import PredictionTrends from './PredictionTrends';
import ConfidenceAnalysis from './ConfidenceAnalysis';
import FeedbackInsights from './FeedbackInsights';
import AdminPanel from './AdminPanel';
import imageLogo from '../assets/logo4.png';
function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col items-center">
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
}

function Dashboard() {
  console.log('imageLogo', imageLogo);
  const [summary, setSummary] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [summaryRes, predictionRes, feedbackRes] = await Promise.all([
          axiosInstance.get('/api/analytics/analytics/summary'),
          axiosInstance.get('/api/analytics/analytics/predictions'),
          axiosInstance.get('/api/analytics/analytics/feedback'),
        ]);
        setSummary(summaryRes.data);
        setPrediction(predictionRes.data);
        setFeedback(feedbackRes.data);
      } catch {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Bar */}
      <header className="bg-gray-800 rounded-b-2xl shadow-lg mb-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 rounded-full h-10 w-10 flex items-center justify-center">
              <img src={imageLogo} alt="logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-white text-3xl font-bold tracking-wide">CropMD</span>
          </div>
          <div className="flex items-center text-teal-300">
            <ShieldCheckIcon className="h-6 w-6 mr-2" />
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard
            title="Total Users"
            value={summary?.total_users ?? 0}
            icon={<UsersIcon className="h-6 w-6 text-teal-500" />}
            subtitle="Registered users"
          />
          <StatCard
            title="Total Predictions"
            value={summary?.total_predictions ?? 0}
            icon={<ChartBarIcon className="h-6 w-6 text-teal-500" />}
            subtitle="Predictions made by users"
          />
          <StatCard
            title="Total Feedback"
            value={summary?.total_feedback ?? 0}
            icon={<ChatBubbleLeftRightIcon className="h-6 w-6 text-teal-500" />}
            subtitle="Feedback submitted"
          />
          <StatCard
            title="Average Rating"
            value={Number(summary?.average_rating ?? 0).toFixed(2)}
            icon={<StarIcon className="h-6 w-6 text-teal-500" />}
            subtitle="User rating of prediction accuracy"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              <DiseaseDistribution data={summary?.disease_distribution} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              <PredictionTrends data={prediction?.predictions_by_day} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              <ConfidenceAnalysis data={prediction?.confidence_distribution} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              {/* Only show rating distribution chart */}
              {feedback && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
                  <FeedbackInsights ratingDistribution={feedback.rating_distribution} ratingByDisease={{}} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              {/* Only show average rating by disease chart */}
              {feedback && (
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Average Accuracy Rating per Disease</h3>
                  <FeedbackInsights ratingDistribution={{}} ratingByDisease={feedback.rating_by_disease} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Panel Section */}
        <div className="mt-8">
          <div className="bg-white border border-gray-200 shadow rounded-lg flex flex-col">
            <AdminPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 