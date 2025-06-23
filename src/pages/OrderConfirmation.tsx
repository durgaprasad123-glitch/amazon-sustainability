import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Leaf, Award, Recycle, ArrowRight } from 'lucide-react';

function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state || {
    orderTotal: 89.97,
    plasticSaved: 120,
    co2Saved: 0.45,
    greenPoints: 3,
    selectedPackaging: 'coconut'
  };

  const packagingInfo = {
    coconut: {
      name: 'Coconut Pulp Packaging',
      icon: '🥥',
      description: 'Biodegradable packaging made from coconut waste'
    },
    recycled: {
      name: 'Recycled Cardboard',
      icon: '📦',
      description: 'Made from 100% recycled materials'
    }
  };

  const packaging = packagingInfo[orderData.selectedPackaging as keyof typeof packagingInfo] || packagingInfo.coconut;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">Thank you for your order. We'll send you shipping confirmation soon.</p>
            
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-2xl font-bold text-gray-900">${orderData.orderTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 mb-6">
          <div className="text-center mb-6">
            <Leaf className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Environmental Impact</h2>
            <p className="text-green-100">Every purchase makes a difference!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-100">{orderData.plasticSaved.toFixed(0)}g</div>
                <div className="text-green-200">Plastic Saved</div>
                <div className="text-sm text-green-300 mt-1">Equivalent to 1 water bottle</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-100">{orderData.co2Saved.toFixed(2)}kg</div>
                <div className="text-blue-200">CO₂ Reduced</div>
                <div className="text-sm text-blue-300 mt-1">Like planting a tree</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-100">{orderData.greenPoints}</div>
                <div className="text-yellow-200">Green Points Earned</div>
                <div className="text-sm text-yellow-300 mt-1">Redeem for rewards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Packaging Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{packaging.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{packaging.name}</h3>
              <p className="text-gray-600">{packaging.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-600 font-medium">100% Sustainable</div>
              <div className="text-xs text-gray-500">AI Recommended</div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            to="/dashboard"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Track Your Impact</h3>
                <p className="text-sm text-gray-600">View your eco dashboard</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          <Link 
            to="/rewards"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Redeem Points</h3>
                <p className="text-sm text-gray-600">Visit rewards store</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          <Link 
            to="/reverse-logistics"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Recycle className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Return Packaging</h3>
                <p className="text-sm text-gray-600">Earn bonus points</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;