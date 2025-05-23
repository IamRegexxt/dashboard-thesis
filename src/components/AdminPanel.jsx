import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import UserManagement from './admin/UserManagement'
import RecentPredictions from './admin/RecentPredictions'
import RecentFeedback from './admin/RecentFeedback'
import axiosInstance from '../utils/axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function AdminPanel() {
  const [users, setUsers] = useState([])
  const [predictions, setPredictions] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, predictionsRes, feedbackRes] = await Promise.all([
          axiosInstance.get('/api/admin/admin/users'),
          axiosInstance.get('/api/admin/admin/recent-predictions'),
          axiosInstance.get('/api/admin/admin/recent-feedback')
        ])

        setUsers(usersRes.data)
        setPredictions(predictionsRes.data)
        setFeedback(feedbackRes.data)
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage users, view recent predictions, and monitor feedback.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-teal-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-teal-700 shadow'
                    : 'text-teal-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Users
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-teal-700 shadow'
                    : 'text-teal-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Recent Predictions
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-teal-700 shadow'
                    : 'text-teal-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Recent Feedback
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <UserManagement users={users} />
            </Tab.Panel>
            <Tab.Panel>
              <RecentPredictions predictions={predictions} />
            </Tab.Panel>
            <Tab.Panel>
              <RecentFeedback feedback={feedback} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default AdminPanel 