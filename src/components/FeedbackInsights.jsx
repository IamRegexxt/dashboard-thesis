import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function FeedbackInsights({ ratingDistribution, ratingByDisease }) {
  if (!ratingDistribution || !ratingByDisease) return null

  const ratingData = Object.entries(ratingDistribution).map(([rating, count]) => ({
    rating: rating.replace(' stars', ''),
    count
  }))

  const diseaseData = Object.entries(ratingByDisease).map(([disease, rating]) => ({
    disease,
    rating: parseFloat(rating.toFixed(1))
  }))

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback Insights</h3>
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Rating Distribution</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="rating" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} feedbacks`, 'Count']}
                />
                <Bar 
                  dataKey="count" 
                  fill="#319795"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Average Rating by Disease</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="disease" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip 
                  formatter={(value) => [`${value} stars`, 'Rating']}
                />
                <Bar 
                  dataKey="rating" 
                  fill="#319795"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackInsights 