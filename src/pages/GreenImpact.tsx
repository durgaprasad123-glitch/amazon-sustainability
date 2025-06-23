import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Globe, Leaf, Package, TrendingUp, Users, MapPin, Award, Recycle } from 'lucide-react';

function GreenImpact() {
  const [realTimeStats, setRealTimeStats] = useState({
    plasticSaved: 2547832,
    co2Reduced: 847234,
    coconutReused: 156789,
    greenOrders: 89.7
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        plasticSaved: prev.plasticSaved + Math.floor(Math.random() * 50),
        co2Reduced: prev.co2Reduced + Math.floor(Math.random() * 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const monthlyData = [
    { month: 'Jan', plastic: 185, co2: 92, orders: 15420 },
    { month: 'Feb', plastic: 220, co2: 115, orders: 18750 },
    { month: 'Mar', plastic: 340, co2: 178, orders: 22380 },
    { month: 'Apr', plastic: 280, co2: 142, orders: 19890 },
    { month: 'May', plastic: 190, co2: 98, orders: 16720 },
    { month: 'Jun', plastic: 425, co2: 220, orders: 28950 }
  ];

  const packagingBreakdown = [
    { name: 'Coconut Pulp', value: 67, color: '#10B981', count: 45678 },
    { name: 'Recycled Paper', value: 28, color: '#F59E0B', count: 19087 },
    { name: 'Standard Packaging', value: 5, color: '#6B7280', count: 3401 }
  ];

  const topStates = [
    { state: 'California', plastic: 425.6, orders: 12450 },
    { state: 'New York', plastic: 387.2, orders: 10980 },
    { state: 'Texas', plastic: 356.8, orders: 9870 },
    { state: 'Florida', plastic: 298.4, orders: 8220 },
    { state: 'Washington', plastic: 267.9, orders: 7510 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Globe className="w-12 h-12" />
              <h1 className="text-5xl font-bold">Amazon Green Impact</h1>
            </div>
            <p className="text-xl text-gray-100 mb-8">Real-time global environmental impact dashboard</p>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <Leaf className="w-8 h-8 mx-auto mb-3 text-green-300" />
              <div className="text-3xl font-bold text-green-100 mb-1">
                {(realTimeStats.plasticSaved / 1000).toFixed(1)}T
              </div>
              <div className="text-green-200 text-sm">Plastic Saved</div>
              <div className="text-xs text-green-300 mt-1">+{Math.floor(Math.random() * 50)} g/min</div>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-blue-300" />
              <div className="text-3xl font-bold text-blue-100 mb-1">
                {(realTimeStats.co2Reduced / 1000).toFixed(0)}T
              </div>
              <div className="text-blue-200 text-sm">CO₂ Reduced</div>
              <div className="text-xs text-blue-300 mt-1">+{Math.floor(Math.random() * 20)} kg/min</div>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-3 text-orange-300" />
              <div className="text-3xl font-bold text-orange-100 mb-1">
                {realTimeStats.coconutReused.toLocaleString()}
              </div>
              <div className="text-orange-200 text-sm">Packages Reused</div>
              <div className="text-xs text-orange-300 mt-1">Avg 7.2 cycles each</div>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-purple-300" />
              <div className="text-3xl font-bold text-purple-100 mb-1">
                {realTimeStats.greenOrders.toFixed(1)}%
              </div>
              <div className="text-purple-200 text-sm">Green Orders</div>
              <div className="text-xs text-purple-300 mt-1">This month</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Environmental Impact</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="plastic" fill="#10B981" name="Plastic Saved (T)" />
              <Bar dataKey="co2" fill="#3B82F6" name="CO₂ Reduced (T)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Packaging Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Packaging Material Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packagingBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {packagingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {packagingBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.count.toLocaleString()} packages</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing States */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Eco-Performing States</h3>
            <div className="space-y-4">
              {topStates.map((state, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{state.state}</p>
                      <p className="text-sm text-gray-600">{state.orders.toLocaleString()} green orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{state.plastic}T</p>
                    <p className="text-xs text-gray-500">plastic saved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Impact Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Impact Visualization</h2>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map Coming Soon</h3>
            <p className="text-gray-600">Real-time visualization of environmental impact across regions</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Green Revolution</h2>
          <p className="text-xl text-green-100 mb-6">
            Every purchase makes a difference. Start tracking your impact today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Track Your Impact
            </a>
            <a
              href="/green-store"
              className="bg-green-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
            >
              Shop Green Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreenImpact;