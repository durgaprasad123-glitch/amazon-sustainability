import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Leaf, Award, Package, TrendingUp, Gift, Recycle, Target } from 'lucide-react';

function Dashboard() {
  const { user } = useUser();

  // Mock data for charts
  const plasticData = [
    { month: 'Jan', plastic: 180, cumulative: 180 },
    { month: 'Feb', plastic: 220, cumulative: 400 },
    { month: 'Mar', plastic: 340, cumulative: 740 },
    { month: 'Apr', plastic: 280, cumulative: 1020 },
    { month: 'May', plastic: 190, cumulative: 1210 },
    { month: 'Jun', plastic: 40, cumulative: 1250 }
  ];

  const co2Data = [
    { month: 'Jan', co2: 0.8 },
    { month: 'Feb', co2: 1.2 },
    { month: 'Mar', co2: 1.8 },
    { month: 'Apr', co2: 1.5 },
    { month: 'May', co2: 1.0 },
    { month: 'Jun', co2: 0.2 }
  ];

  const packagingData = [
    { name: 'Coconut Pulp', value: 70, color: '#10B981' },
    { name: 'Recycled Paper', value: 25, color: '#F59E0B' },
    { name: 'Standard', value: 5, color: '#6B7280' }
  ];

  const nextBadge = user.greenPoints >= 100 ? 'Eco Master' : user.greenPoints >= 50 ? 'Green Warrior' : 'Eco Hero';
  const nextBadgePoints = user.greenPoints >= 100 ? 200 : user.greenPoints >= 50 ? 100 : 50;
  const progressToNext = (user.greenPoints / nextBadgePoints) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Eco Impact Dashboard</h1>
          <p className="text-gray-600">Track your environmental impact and sustainability achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Plastic Saved</p>
                <p className="text-3xl font-bold">{user.totalPlasticSaved.toFixed(0)}g</p>
              </div>
              <Leaf className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">CO₂ Reduced</p>
                <p className="text-3xl font-bold">{user.totalCO2Saved.toFixed(1)}kg</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Green Points</p>
                <p className="text-3xl font-bold">{user.greenPoints}</p>
              </div>
              <Award className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Orders Placed</p>
                <p className="text-3xl font-bold">{user.ordersCount}</p>
              </div>
              <Package className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Plastic Saved Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Plastic Saved Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={plasticData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="plastic" fill="#10B981" name="Monthly (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Packaging Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Packaging Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packagingData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {packagingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CO2 Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">CO₂ Reduction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={co2Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="co2" stroke="#3B82F6" strokeWidth={3} name="CO₂ Saved (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Badges & Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements & Badges</h3>
            
            <div className="space-y-4 mb-6">
              {user.badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3 bg-green-50 rounded-lg p-3">
                  <Award className="w-6 h-6 text-green-500" />
                  <span className="font-medium text-green-800">{badge}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress to {nextBadge}</span>
                <span className="text-sm text-gray-600">{user.greenPoints}/{nextBadgePoints} points</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link
                to="/rewards"
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Gift className="w-6 h-6 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">Redeem Points</p>
                    <p className="text-sm text-gray-600">Visit reward store</p>
                  </div>
                </div>
                <span className="text-purple-600 font-semibold">{user.greenPoints} pts</span>
              </Link>

              <Link
                to="/reverse-logistics"
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Recycle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Return Packaging</p>
                    <p className="text-sm text-gray-600">Earn bonus points</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+5 pts</span>
              </Link>

              <Link
                to="/green-store"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Leaf className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Shop Green Products</p>
                    <p className="text-sm text-gray-600">Discover eco-friendly items</p>
                  </div>
                </div>
                <Target className="w-5 h-5 text-blue-500" />
              </Link>

              <Link
                to="/green-impact"
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Global Impact</p>
                    <p className="text-sm text-gray-600">See worldwide progress</p>
                  </div>
                </div>
                <Target className="w-5 h-5 text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;