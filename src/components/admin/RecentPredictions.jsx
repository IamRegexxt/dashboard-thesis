import { useState } from 'react'
import axiosInstance from '../../utils/axios'

function RecentPredictions({ predictions }) {
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [isViewing, setIsViewing] = useState(false)

  const handleView = (prediction) => {
    setSelectedPrediction(prediction)
    setIsViewing(true)
  }

  const handleDelete = async (predictionId) => {
    // Commented out delete functionality
    /*
    if (window.confirm('Are you sure you want to delete this prediction?')) {
      try {
        await axiosInstance.delete(`/api/admin/predictions/${predictionId}`)
        // Refresh predictions list
        window.location.reload()
      } catch (error) {
        console.error('Error deleting prediction:', error)
      }
    }
    */
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    User Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Disease
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Confidence
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Created At
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {predictions.map((prediction) => (
                  <tr key={prediction.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {prediction.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {prediction.user_email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {prediction.disease}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        prediction.confidence >= 0.8 
                          ? 'bg-green-100 text-green-800'
                          : prediction.confidence >= 0.6
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {prediction.confidence.toFixed(1)}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(prediction.created_at).toLocaleString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {/* <button
                        onClick={() => handleView(prediction)}
                        className="text-teal-600 hover:text-teal-900 mr-4"
                      >
                        View
                      </button> */}
                      {/* Delete button commented out
                      <button
                        onClick={() => handleDelete(prediction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                      */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isViewing && selectedPrediction && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">User</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedPrediction.user.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Date</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedPrediction.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Prediction</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedPrediction.prediction}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Input Data</h4>
                <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md overflow-auto">
                  {JSON.stringify(selectedPrediction.inputData, null, 2)}
                </pre>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsViewing(false)
                  setSelectedPrediction(null)
                }}
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentPredictions 