import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Package, Leaf, CreditCard, MapPin, Truck } from 'lucide-react';

function Checkout() {
  const { items, totalPrice, enableGroupedDelivery, clearCart, calculateEnvironmentalImpact } = useCart();
  const { addGreenPoints, updateUser, user } = useUser();
  const navigate = useNavigate();
  
  const [shippingInfo, setShippingInfo] = useState({
    name: user.name,
    email: user.email,
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [selectedPackaging, setSelectedPackaging] = useState('coconut');

  const { plasticSaved, co2Saved, greenPoints } = calculateEnvironmentalImpact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add green points to user
    addGreenPoints(greenPoints);
    
    // Update user impact stats
    updateUser({
      totalPlasticSaved: user.totalPlasticSaved + plasticSaved,
      totalCO2Saved: user.totalCO2Saved + co2Saved,
      ordersCount: user.ordersCount + 1
    });
    
    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderTotal: totalPrice - (enableGroupedDelivery ? 2.50 : 0),
        plasticSaved,
        co2Saved,
        greenPoints,
        selectedPackaging
      }
    });
  };

  const packagingOptions = [
    {
      id: 'coconut',
      name: 'Coconut Pulp Packaging',
      description: 'Biodegradable, made from coconut waste',
      plasticSaved: plasticSaved * 1.2,
      co2Saved: co2Saved * 1.1,
      recommended: true,
      icon: '🥥'
    },
    {
      id: 'recycled',
      name: 'Recycled Paper/Cardboard',
      description: 'Made from recycled materials',
      plasticSaved: plasticSaved * 0.8,
      co2Saved: co2Saved * 0.9,
      recommended: false,
      icon: '📦'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Packaging Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Smart Packaging Selection</h2>
                </div>
                
                <div className="space-y-4">
                  {packagingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackaging === option.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackaging(option.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="packaging"
                          value={option.id}
                          checked={selectedPackaging === option.id}
                          onChange={(e) => setSelectedPackaging(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{option.icon}</span>
                            <h3 className="font-semibold text-gray-900">{option.name}</h3>
                            {option.recommended && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          <div className="flex space-x-4 mt-2 text-sm">
                            <span className="text-green-600">
                              🌱 {option.plasticSaved.toFixed(0)}g plastic saved
                            </span>
                            <span className="text-blue-600">
                              ♻️ {option.co2Saved.toFixed(2)}kg CO₂ reduced
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  {enableGroupedDelivery && (
                    <div className="flex justify-between text-green-600">
                      <span>Grouped Delivery Savings</span>
                      <span className="font-semibold">-$2.50</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(totalPrice - (enableGroupedDelivery ? 2.50 : 0)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Environmental Impact Preview */}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                    <Leaf className="w-4 h-4" />
                    <span>Environmental Impact</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Plastic saved:</span>
                      <span className="font-semibold text-green-800">{plasticSaved.toFixed(0)}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">CO₂ reduced:</span>
                      <span className="font-semibold text-green-800">{co2Saved.toFixed(2)}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Green points:</span>
                      <span className="font-semibold text-green-800">+{greenPoints}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Place Order</span>
                  <Truck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;