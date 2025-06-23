import React, { useState } from 'react';
import { rewards } from '../data/products';
import { useUser } from '../context/UserContext';
import { Gift, Award, ShoppingBag, Star, CheckCircle, AlertCircle } from 'lucide-react';

function RewardStore() {
  const { user, spendGreenPoints } = useUser();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [redeemedItems, setRedeemedItems] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');

  const handleRedeem = (rewardId: string, pointsRequired: number) => {
    if (user.greenPoints >= pointsRequired) {
      const success = spendGreenPoints(pointsRequired);
      if (success) {
        setRedeemedItems([...redeemedItems, rewardId]);
        setModalType('success');
        setModalMessage('Reward redeemed successfully! It will be processed within 24 hours.');
      } else {
        setModalType('error');
        setModalMessage('Failed to redeem reward. Please try again.');
      }
    } else {
      setModalType('error');
      setModalMessage(`You need ${pointsRequired - user.greenPoints} more points to redeem this reward.`);
    }
    setShowModal(true);
    setSelectedReward(null);
  };

  const availableRewards = rewards.filter(reward => !redeemedItems.includes(reward.id));
  const claimedRewards = rewards.filter(reward => redeemedItems.includes(reward.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gift className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-900">Green Rewards Store</h1>
          </div>
          <p className="text-gray-600 mb-4">Redeem your Green Points for exclusive eco-friendly rewards</p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Award className="w-6 h-6 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{user.greenPoints}</span>
              <span className="text-gray-600">points available</span>
            </div>
            <div className="text-sm text-gray-500">
              Earn more points by shopping green products and returning packaging
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-green-500" />
            <span>Available Rewards</span>
          </h2>
          
          {availableRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-purple-600">
                          {reward.pointsRequired} points
                        </span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        user.greenPoints >= reward.pointsRequired
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.greenPoints >= reward.pointsRequired ? 'Available' : 'Need more points'}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedReward(reward.id)}
                      disabled={user.greenPoints < reward.pointsRequired}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        user.greenPoints >= reward.pointsRequired
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {user.greenPoints >= reward.pointsRequired ? 'Redeem' : 'Insufficient Points'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All rewards claimed!</h3>
              <p className="text-gray-600">Check back later for new rewards or browse your claimed items below.</p>
            </div>
          )}
        </section>

        {/* Claimed Rewards */}
        {claimedRewards.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span>Your Claimed Rewards</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {claimedRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-lg shadow-sm overflow-hidden opacity-75">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-purple-600">
                          {reward.pointsRequired} points
                        </span>
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Claimed
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How to Earn More Points */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Earn More Green Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <ShoppingBag className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Shop Green Products</h3>
              <p className="text-sm text-green-100">Earn 1 point per 200g plastic saved</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <Award className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Reduce CO₂</h3>
              <p className="text-sm text-blue-100">Earn 1 point per 0.5kg CO₂ saved</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <Gift className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Return Packaging</h3>
              <p className="text-sm text-purple-100">Earn 5 bonus points per return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {(() => {
              const reward = rewards.find(r => r.id === selectedReward);
              if (!reward) return null;
              
              return (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Redemption</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <p className="text-sm font-semibold text-purple-600">
                        {reward.pointsRequired} points required
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    You currently have {user.greenPoints} points. After redemption, you'll have{' '}
                    {user.greenPoints - reward.pointsRequired} points remaining.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedReward(null)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRedeem(reward.id, reward.pointsRequired)}
                      className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Success/Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            {modalType === 'success' ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
            <h3 className={`text-xl font-semibold mb-4 ${
              modalType === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {modalType === 'success' ? 'Redemption Successful!' : 'Redemption Failed'}
            </h3>
            <p className="text-gray-600 mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                modalType === 'success'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardStore;