import React, { useState } from 'react';
import { Package, QrCode, MapPin, Truck, CheckCircle, Clock, Award, Recycle } from 'lucide-react';
import { useUser } from '../context/UserContext';

function ReverseLogistics() {
  const [step, setStep] = useState(1);
  const [packageId, setPackageId] = useState('');
  const [returnMethod, setReturnMethod] = useState('');
  const [locationData, setLocationData] = useState('');
  const { addGreenPoints } = useUser();

  const mockPackages = [
    {
      id: 'PKG-2024-001',
      orderDate: '2024-01-15',
      items: ['Organic Cotton T-Shirt', 'Bamboo Yoga Mat'],
      packagingType: 'Coconut Pulp',
      reuseCount: 3,
      maxReuse: 12,
      bonusPoints: 5
    },
    {
      id: 'PKG-2024-002',
      orderDate: '2024-01-20',
      items: ['Recycled Paper Notebook Set'],
      packagingType: 'Recycled Cardboard',
      reuseCount: 7,
      maxReuse: 8,
      bonusPoints: 3
    }
  ];

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (packageId) {
      setStep(2);
    }
  };

  const handleReturnMethodSelect = (method: string) => {
    setReturnMethod(method);
    setStep(3);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationData) {
      setStep(4);
      // Add green points for returning packaging
      addGreenPoints(5);
    }
  };

  const selectedPackage = mockPackages.find(pkg => pkg.id === packageId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Recycle className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900">Return Packaging</h1>
          </div>
          <p className="text-gray-600">Help us reduce waste and earn Green Points by returning your packaging</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > num ? <CheckCircle className="w-6 h-6" /> : num}
                </div>
                {num < 4 && (
                  <div className={`w-12 h-1 ${step > num ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 1: Enter Package Information</h2>
              
              <form onSubmit={handlePackageSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package ID or Order Number
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      placeholder="Enter package ID (e.g., PKG-2024-001)"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <QrCode className="w-5 h-5" />
                      <span>Scan QR</span>
                    </button>
                  </div>
                </div>

                {/* Sample Package IDs */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-3">Try these sample package IDs:</p>
                  <div className="flex flex-wrap gap-2">
                    {mockPackages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageId(pkg.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        {pkg.id}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 2 && selectedPackage && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 2: Package Details & Return Method</h2>
              
              {/* Package Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPackage.id}</h3>
                    <p className="text-sm text-gray-600">Order Date: {selectedPackage.orderDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Items:</p>
                    <ul className="text-sm text-gray-600">
                      {selectedPackage.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Packaging: {selectedPackage.packagingType}</p>
                    <p className="text-sm text-gray-600">
                      Reused: {selectedPackage.reuseCount}/{selectedPackage.maxReuse} times
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      Bonus: +{selectedPackage.bonusPoints} Green Points
                    </p>
                  </div>
                </div>
              </div>

              {/* Return Methods */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Choose Return Method:</h3>
                
                <button
                  onClick={() => handleReturnMethodSelect('pickup')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Truck className="w-8 h-8 text-blue-500" />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900">Schedule Pickup</h4>
                      <p className="text-sm text-gray-600">Our delivery partner will collect from your location</p>
                      <p className="text-sm text-green-600">FREE • Next available slot</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleReturnMethodSelect('dropoff')}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-8 h-8 text-orange-500" />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900">Drop-off Location</h4>
                      <p className="text-sm text-gray-600">Find nearest Amazon pickup point or partner store</p>
                      <p className="text-sm text-green-600">FREE • Available 24/7</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Step 3: {returnMethod === 'pickup' ? 'Schedule Pickup' : 'Select Drop-off Location'}
              </h2>
              
              <form onSubmit={handleLocationSubmit}>
                {returnMethod === 'pickup' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Address
                      </label>
                      <textarea
                        value={locationData}
                        onChange={(e) => setLocationData(e.target.value)}
                        placeholder="Enter your full address for pickup"
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (12 PM - 6 PM)</option>
                        <option>Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Drop-off Location
                      </label>
                      <select
                        value={locationData}
                        onChange={(e) => setLocationData(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Choose a location</option>
                        <option value="amazon-locker-1">Amazon Locker - Downtown Mall</option>
                        <option value="amazon-locker-2">Amazon Locker - City Center</option>
                        <option value="partner-store-1">Partner Store - Green Market</option>
                        <option value="partner-store-2">Partner Store - Eco Hub</option>
                      </select>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        <strong>Tip:</strong> Drop-off locations are available 24/7 and you'll receive confirmation once your package is processed.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  {returnMethod === 'pickup' ? 'Schedule Pickup' : 'Confirm Drop-off'}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Request Confirmed!</h2>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-800">+5 Green Points Earned!</span>
                </div>
                <p className="text-green-700">
                  Thank you for helping us reduce waste! Your packaging will be reused up to {
                    selectedPackage ? selectedPackage.maxReuse - selectedPackage.reuseCount : 5
                  } more times.
                </p>
              </div>

              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {returnMethod === 'pickup' 
                      ? 'Pickup scheduled within 24 hours' 
                      : 'Drop-off confirmed - process within 48 hours'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Tracking ID: RET-{Date.now().toString().slice(-6)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Return Another Package
                </button>
                <a
                  href="/dashboard"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  View My Dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReverseLogistics;