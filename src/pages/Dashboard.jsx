import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

const Dashboard = ({ onNavigate, onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // If no user, redirect to login
      onNavigate && onNavigate('login');
    }
  }, [onNavigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const userName = user.name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Mobile: Stacked Layout */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-0 sm:h-16 gap-3 sm:gap-0">
            {/* Logo */}
            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
              <button 
                onClick={() => onNavigate && onNavigate('home')}
                className="text-xl sm:text-2xl font-bold"
              >
                <span className="text-green-800">wastee</span>
              </button>
              
              {/* Mobile: Notification and Profile */}
              <div className="flex items-center space-x-2 sm:hidden">
                <button className="relative p-2 text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-800 font-semibold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop: Search, Button, and Profile */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Add Collection Point Button */}
              <button
                onClick={() => {
                  alert('Add Collection Point feature coming soon!');
                }}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                style={{ backgroundColor: '#2E6A56' }}
              >
                <span className="hidden sm:inline">Add Collection Point</span>
                <span className="sm:hidden">Add Point</span>
              </button>

              {/* Notification Bell */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-800 font-semibold text-sm sm:text-base">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile: Search and Add Button Row */}
            <div className="flex sm:hidden w-full gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => {
                  alert('Add Collection Point feature coming soon!');
                }}
                className="px-3 py-2 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                style={{ backgroundColor: '#2E6A56' }}
              >
                Add Point
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button and Welcome Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm sm:text-base font-medium">Back to Home</span>
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Welcome, {userName}</h1>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Total E-waste Collection Points */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total E-waste Collection Points</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">200</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-600">Active 190</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-gray-600">Inactive 10</span>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">2000</p>
            <p className="text-xs sm:text-sm text-green-600">↑ +6.5% Since Last Month</p>
          </div>

          {/* Total Donations */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Donations</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">1,000</p>
            <p className="text-xs sm:text-sm text-green-600">↑ +3.5% Since Last Month</p>
          </div>

          {/* Total Partnerships */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Partnerships</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">150</p>
            <p className="text-xs sm:text-sm text-green-600">↑ +2.4% Since Last Month</p>
          </div>
        </div>

        {/* Top E-waste Donated Card and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Top E-waste Donated Card */}
          <div className="lg:col-span-1 bg-green-800 rounded-lg p-4 sm:p-5 lg:p-6 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Top E-waste Donated</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">1. Computers and laptops</span>
                <span className="font-bold text-sm sm:text-base">200+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">2. Smartphones and tablets</span>
                <span className="font-bold text-sm sm:text-base">800+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">3. Televisions</span>
                <span className="font-bold text-sm sm:text-base">300+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">4. Printers and scanners</span>
                <span className="font-bold text-sm sm:text-base">400+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm">5. Gaming consoles</span>
                <span className="font-bold text-sm sm:text-base">200+</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { icon: '📢', label: 'Create Campaign' },
                { icon: '👥', label: 'Manage Users' },
                { icon: '💰', label: 'Manage Donations' },
                { icon: '🤝', label: 'Manage Partnerships' },
                { icon: '📦', label: 'Manage Inventory' },
                { icon: '🎁', label: 'Manage Rewards' },
                { icon: '💬', label: 'View User Feedback' },
                { icon: '💳', label: 'Manage Payments' },
              ].map((action, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-green-500 hover:shadow-md transition-all text-center"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{action.icon}</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Eco Points Balance Distribution Among Users</h3>
              <select className="border border-gray-300 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm w-full sm:w-auto">
                <option>Filter</option>
              </select>
            </div>
            <div className="h-48 sm:h-56 lg:h-64 flex items-end justify-between space-x-1 sm:space-x-2 overflow-x-auto">
              {Array.from({ length: 17 }).map((_, i) => (
                <div key={i} className="flex-1 min-w-[20px] flex flex-col items-center">
                  <div className="w-full flex flex-col-reverse">
                    <div className="h-6 sm:h-8 bg-green-500 rounded-t"></div>
                    <div className="h-8 sm:h-10 lg:h-12 bg-red-500 rounded-t"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 whitespace-nowrap">May {i + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-3 sm:mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-xs sm:text-sm text-gray-600">Positive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-xs sm:text-sm text-gray-600">Negative</span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Distribution of E-waste Donations</h3>
              <select className="border border-gray-300 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm w-full sm:w-auto">
                <option>Filter</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900">Total</p>
                    <p className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-900">Donations</p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-800">1,000</p>
                  </div>
                </div>
                <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="35 100" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="25 100" strokeDashoffset="-35" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="20" strokeDasharray="15 100" strokeDashoffset="-60" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="20" strokeDasharray="10 100" strokeDashoffset="-75" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="10 100" strokeDashoffset="-85" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#EC4899" strokeWidth="20" strokeDasharray="5 100" strokeDashoffset="-95" />
                </svg>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2">
              {[
                { label: 'Computers and accessories', value: '35%', color: 'bg-green-500' },
                { label: 'Mobile phones and tablets', value: '25%', color: 'bg-blue-500' },
                { label: 'TVs and monitors', value: '15%', color: 'bg-yellow-500' },
                { label: 'Batteries', value: '10%', color: 'bg-red-500' },
                { label: 'Other electronic devices', value: '10%', color: 'bg-purple-500' },
                { label: 'Appliances', value: '5%', color: 'bg-pink-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${item.color} rounded mr-2 flex-shrink-0`}></div>
                    <span className="text-gray-700 truncate">{item.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900 ml-2 flex-shrink-0">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { 
              label: 'E-waste Collection', 
              value: '20k', 
              change: '+20%', 
              positive: true,
              graphPoints: [20, 25, 30, 28, 35, 40, 38, 42, 45, 48, 50, 52, 55, 58, 60]
            },
            { 
              label: 'E-waste Donation', 
              value: '1k', 
              change: '+3.5%', 
              positive: true,
              graphPoints: [10, 12, 15, 14, 16, 18, 17, 19, 20, 22, 21, 23, 24, 25, 26]
            },
            { 
              label: 'User Engagement', 
              value: '5k', 
              change: '-10%', 
              positive: false,
              graphPoints: [50, 48, 45, 43, 40, 38, 35, 33, 30, 28, 25, 23, 20, 18, 15]
            },
            { 
              label: 'Eco Points Activity', 
              value: '5k', 
              change: '+20%', 
              positive: true,
              graphPoints: [15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50]
            },
            { 
              label: 'Corporate Engagement', 
              value: '5k', 
              change: '+2.8%', 
              positive: true,
              graphPoints: [20, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
            },
            { 
              label: 'Campaign Effectiveness', 
              value: '30k', 
              change: '+25%', 
              positive: true,
              graphPoints: [25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60]
            },
          ].map((metric, i) => {
            const maxValue = Math.max(...metric.graphPoints);
            const minValue = Math.min(...metric.graphPoints);
            const range = maxValue - minValue || 1;
            const graphHeight = 40;
            const graphWidth = 150;
            const stepX = graphWidth / (metric.graphPoints.length - 1);
            
            const pathData = metric.graphPoints.map((point, idx) => {
              const x = idx * stepX;
              const y = graphHeight - ((point - minValue) / range) * graphHeight;
              return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ');

            const areaPath = `M 0 ${graphHeight} ${pathData} L ${graphWidth} ${graphHeight} Z`;

            return (
              <div
                key={i}
                className={`rounded-lg shadow-lg p-3 sm:p-4 ${
                  metric.positive 
                    ? 'bg-green-800' 
                    : 'bg-red-600'
                }`}
              >
                <h3 className="text-[10px] sm:text-xs font-medium text-white mb-2 leading-tight">{metric.label}</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{metric.value}</p>
                
                {/* Line Graph */}
                <div className="mb-2 h-10 sm:h-12 overflow-hidden">
                  <svg 
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`} 
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Area fill */}
                    <path
                      d={areaPath}
                      fill={metric.positive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)'}
                    />
                    {/* Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {metric.change.startsWith('+') ? '↑' : '↓'} {metric.change.replace(/[+-]/g, '')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
