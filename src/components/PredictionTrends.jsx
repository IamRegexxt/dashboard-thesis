import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function PredictionTrends({ data }) {
  if (!data) return null

  const chartData = Object.entries(data).map(([date, count]) => ({
    date,
    count
  }))

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction Trends (Last 30 Days)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
              formatter={(value) => [`${value} predictions`, 'Count']}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#319795" 
              strokeWidth={2}
              dot={{ fill: '#319795' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PredictionTrends 