import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Star, Leaf, Truck, Shield, Heart, Share2, PieChart, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const additionalImages = [
    product.imageUrl,
    'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1267301/pexels-photo-1267301.jpeg?auto=compress&cs=tinysrgb&w=500'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={additionalImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                {additionalImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Green Badge */}
              {product.isGreen && (
                <div className="mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Leaf className="w-6 h-6 text-green-500" />
                      <div>
                        <h3 className="font-semibold text-green-800">Eco-Friendly Product</h3>
                        <p className="text-sm text-green-600">AI Verified with {product.aiConfidence}% confidence</p>
                      </div>
                    </div>
                    
                    {product.organicPercentage && (
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <PieChart className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold">Composition Analysis</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex justify-between">
                              <span>Organic:</span>
                              <span className="font-semibold text-green-600">{product.organicPercentage}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span>Inorganic:</span>
                              <span className="font-semibold text-gray-600">{product.inorganicPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-green-600 font-medium">
                    You save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                  </p>
                )}
              </div>

              {/* Delivery info */}
              <div className="mb-6">
                {product.fastDelivery && (
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <Truck className="w-5 h-5" />
                    <span className="font-medium">FREE Same-Day Delivery</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>In Stock - Ships from Amazon</span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 mb-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    Buy Now
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <Heart className="w-5 h-5" />
                    <span>Add to Wish List</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;