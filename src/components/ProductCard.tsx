import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Leaf, Truck, PieChart, CheckCircle } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [showEcoChart, setShowEcoChart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Calculate plastic saved and CO2 reduced based on product data
  const plasticSaved = product.weight * 150; // 150g plastic saved per kg of product weight
  const co2Reduced = product.weight * 0.08; // 0.08kg CO2 reduced per kg of product weight

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          
          {/* Green Badge for 90%+ organic products */}
          {product.isGreen && product.organicPercentage && product.organicPercentage >= 90 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Green Certified</span>
            </div>
          )}
          
          {/* Regular Green Badge */}
          {product.isGreen && (
            <div
              className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1 cursor-pointer"
              onMouseEnter={() => setShowEcoChart(true)}
              onMouseLeave={() => setShowEcoChart(false)}
            >
              <Leaf className="w-3 h-3" />
              <span>Green</span>
              {product.aiConfidence && (
                <span className="ml-1 opacity-80">({product.aiConfidence}%)</span>
              )}
            </div>
          )}
          
          {/* Hover Pie Chart for ALL products */}
          {showEcoChart && (
            <div className="absolute top-10 right-2 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10 w-48">
              <div className="flex items-center space-x-2 mb-2">
                <PieChart className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold">Environmental Impact</span>
              </div>
              <div className="text-xs space-y-1">
                {product.isGreen && product.organicPercentage ? (
                  <>
                    <div className="flex justify-between">
                      <span>Organic:</span>
                      <span className="text-green-600 font-semibold">{product.organicPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inorganic:</span>
                      <span className="text-gray-600">{product.inorganicPercentage}%</span>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-600 text-center py-2">
                    Standard product composition
                  </div>
                )}
                <div className="border-t pt-1 space-y-1">
                  <div className="flex justify-between">
                    <span>Plastic saved:</span>
                    <span className="text-green-600 font-semibold">{plasticSaved.toFixed(0)}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CO₂ reduced:</span>
                    <span className="text-blue-600 font-semibold">{co2Reduced.toFixed(2)}kg</span>
                  </div>
                </div>
                {product.aiConfidence && (
                  <div className="flex justify-between pt-1 border-t">
                    <span>AI Confidence:</span>
                    <span className="text-blue-600 font-semibold">{product.aiConfidence}%</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {product.fastDelivery && (
          <div className="flex items-center space-x-1 text-sm text-blue-600 mb-3">
            <Truck className="w-4 h-4" />
            <span>FREE Same-Day Delivery</span>
          </div>
        )}
      </Link>

      <button
        onClick={handleAddToCart}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;