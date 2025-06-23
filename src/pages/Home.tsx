import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Leaf, Package, Globe, Award, ChevronLeft, ChevronRight } from 'lucide-react';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bannerImages = [
    'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1267301/pexels-photo-1267301.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const featuredProducts = products.slice(0, 8);
  const greenProducts = products.filter(p => p.isGreen).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <img 
                src={image} 
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">Shop with Purpose</h1>
                  <p className="text-xl mb-6">Discover eco-friendly products and track your environmental impact</p>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">2.5T</div>
                      <div className="text-sm">Plastic Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">847K</div>
                      <div className="text-sm">CO₂ Reduced (kg)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">94%</div>
                      <div className="text-sm">Green Packaging</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Green Features */}
      <div className="bg-green-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Green Products</h3>
              <p className="text-sm text-gray-600">AI-powered classification of eco-friendly items</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Eco Packaging</h3>
              <p className="text-sm text-gray-600">Coconut pulp & recycled materials</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Impact Tracking</h3>
              <p className="text-sm text-gray-600">Monitor your environmental footprint</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Green Rewards</h3>
              <p className="text-sm text-gray-600">Earn points for sustainable choices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Green Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-green-500" />
              <span>Featured Green Products</span>
            </h2>
            <a href="/green-store" className="text-blue-600 hover:underline">View all green products</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {greenProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;