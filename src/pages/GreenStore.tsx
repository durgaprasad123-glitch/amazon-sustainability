import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Leaf, Filter, SlidersHorizontal } from 'lucide-react';

function GreenStore() {
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  
  const greenProducts = products.filter(p => p.isGreen);
  
  const filteredProducts = greenProducts.filter(product => {
    if (filterBy === 'all') return true;
    if (filterBy === 'organic') return product.organicPercentage && product.organicPercentage > 80;
    if (filterBy === 'recycled') return product.tags.includes('recycled');
    if (filterBy === 'biodegradable') return product.tags.includes('biodegradable');
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'eco-score':
        return (b.aiConfidence || 0) - (a.aiConfidence || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green Store Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Leaf className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Amazon Green Store</h1>
            </div>
            <p className="text-xl mb-6">Discover eco-friendly products powered by AI classification</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">{greenProducts.length}</div>
                <div className="text-green-100">Green Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">94%</div>
                <div className="text-green-100">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">2.5T</div>
                <div className="text-green-100">Plastic Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Filter by:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Green Products</option>
                <option value="organic">Organic (80%+)</option>
                <option value="recycled">Recycled Materials</option>
                <option value="biodegradable">Biodegradable</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="eco-score">Eco Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} eco-friendly products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No green products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => setFilterBy('all')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Show All Green Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GreenStore;