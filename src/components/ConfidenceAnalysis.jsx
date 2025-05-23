import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function ConfidenceAnalysis({ data }) {
  if (!data) return null

  const chartData = Object.entries(data).map(([range, count]) => ({
    range,
    count
  }))

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confidence Score Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="range" 
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} predictions`, 'Count']}
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
  )
}

export default ConfidenceAnalysis 