import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Leaf, Package, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    enableGroupedDelivery, 
    setEnableGroupedDelivery,
    calculateEnvironmentalImpact
  } = useCart();
  
  const [showGroupedDeliveryPopup, setShowGroupedDeliveryPopup] = useState(false);

  const { plasticSaved, co2Saved, greenPoints } = calculateEnvironmentalImpact();

  const handleGroupedDeliveryToggle = (enabled: boolean) => {
    setEnableGroupedDelivery(enabled);
    if (enabled) {
      setShowGroupedDeliveryPopup(true);
      setTimeout(() => setShowGroupedDeliveryPopup(false), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Grouped Delivery Option */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Group your deliveries?</h3>
                      <p className="text-sm text-gray-600">Save packaging and earn extra green points</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableGroupedDelivery}
                      onChange={(e) => handleGroupedDeliveryToggle(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                {enableGroupedDelivery && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ Great choice! You'll save $2.50 and {(plasticSaved * 0.2).toFixed(0)}g of plastic by grouping your delivery.
                    </p>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.isGreen && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Leaf className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600">Eco-friendly</span>
                                {item.organicPercentage && item.organicPercentage >= 90 && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                                    Green Certified
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="text-sm text-gray-600 mt-1">
                              Weight: {item.weight}kg | Size: {item.dimensions}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              ${item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
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
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(totalPrice - (enableGroupedDelivery ? 2.50 : 0)).toFixed(2)}</span>
                </div>
              </div>

              {/* Environmental Impact */}
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
                    <span className="text-green-700">Green points earned:</span>
                    <span className="font-semibold text-green-800">{greenPoints}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                to="/"
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Grouped Delivery Popup */}
        {showGroupedDeliveryPopup && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm animate-fade-in">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold">Delivery Grouped!</p>
                <p className="text-sm">You're saving $2.50 and reducing packaging waste.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;