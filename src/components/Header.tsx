import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, MapPin, Leaf, BarChart3 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Deliver to New York 10001</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-orange-300 flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Hello, {user.name}</span>
            </Link>
            <Link to="/green-impact" className="hover:text-green-300 flex items-center space-x-1">
              <BarChart3 className="w-4 h-4" />
              <span>Global Impact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-orange-500 text-white px-3 py-1 rounded">
              <span className="font-bold text-xl">amazon</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex">
              <select className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-md border-r border-gray-300 focus:outline-none">
                <option>All</option>
                <option>Green Products</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home</option>
              </select>
              <input
                type="text"
                placeholder="Search Amazon"
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <Link to="/rewards" className="hover:text-orange-300 flex flex-col items-center">
              <Leaf className="w-5 h-5" />
              <span className="text-xs">{user.greenPoints} pts</span>
            </Link>
            
            <Link to="/cart" className="hover:text-orange-300 flex items-center space-x-1 relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="text-sm">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-6 text-sm">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-1 hover:text-orange-300"
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>
            <Link to="/" className="hover:text-orange-300">Today's Deals</Link>
            <Link to="/green-store" className="hover:text-green-300 font-semibold">Green Store</Link>
            <Link to="/" className="hover:text-orange-300">Customer Service</Link>
            <Link to="/" className="hover:text-orange-300">Registry</Link>
            <Link to="/" className="hover:text-orange-300">Gift Cards</Link>
            <Link to="/" className="hover:text-orange-300">Sell</Link>
            <Link to="/reverse-logistics" className="hover:text-green-300">Return Packaging</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;