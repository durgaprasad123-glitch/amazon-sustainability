import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Award, Globe } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Green initiatives banner */}
      <div className="bg-green-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span className="text-sm">Carbon Neutral Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Recycle className="w-5 h-5" />
              <span className="text-sm">100% Recyclable Packaging</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span className="text-sm">Certified Green Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Global Impact Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Careers</Link></li>
                <li><Link to="/" className="hover:text-white">Blog</Link></li>
                <li><Link to="/" className="hover:text-white">About Amazon</Link></li>
                <li><Link to="/" className="hover:text-white">Investor Relations</Link></li>
                <li><Link to="/green-impact" className="hover:text-green-300">Amazon Green Impact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Sell products on Amazon</Link></li>
                <li><Link to="/" className="hover:text-white">Sell on Amazon Business</Link></li>
                <li><Link to="/" className="hover:text-white">Sell apps on Amazon</Link></li>
                <li><Link to="/" className="hover:text-white">Become an Affiliate</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Amazon Payment Products</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Amazon Business Card</Link></li>
                <li><Link to="/" className="hover:text-white">Shop with Points</Link></li>
                <li><Link to="/" className="hover:text-white">Reload Your Balance</Link></li>
                <li><Link to="/" className="hover:text-white">Amazon Currency Converter</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white">Amazon and COVID-19</Link></li>
                <li><Link to="/" className="hover:text-white">Your Account</Link></li>
                <li><Link to="/" className="hover:text-white">Your Orders</Link></li>
                <li><Link to="/" className="hover:text-white">Shipping Rates & Policies</Link></li>
                <li><Link to="/reverse-logistics" className="hover:text-green-300">Return Packaging</Link></li>
                <li><Link to="/" className="hover:text-white">Help</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-orange-500 text-white px-3 py-1 rounded">
              <span className="font-bold">amazon</span>
            </div>
            <span className="text-sm text-gray-300">© 2024, Amazon Green Initiative</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <Link to="/" className="hover:text-white">Conditions of Use</Link>
            <Link to="/" className="hover:text-white">Privacy Notice</Link>
            <Link to="/" className="hover:text-white">Your Ads Privacy Choices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;