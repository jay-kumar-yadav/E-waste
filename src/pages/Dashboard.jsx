import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, 
  Users, 
  DollarSign, 
  Handshake, 
  Package, 
  Gift, 
  MessageSquare, 
  CreditCard 
} from 'lucide-react';
import Footer from '../components/Footer';
import api from '../config/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage and verify token
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

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
                onClick={() => navigate('/')}
                className="text-xl sm:text-2xl font-bold"
              >
                <span className="text-green-800">E - Sangrahan</span>
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
                onClick={() => navigate('/add-collection-point')}
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
                onClick={() => navigate('/add-collection-point')}
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
            onClick={() => navigate('/')}
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
                { 
                  label: 'Create Campaign',
                  icon: <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Users',
                  icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Donations',
                  icon: <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Partnerships',
                  icon: <Handshake className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Inventory',
                  icon: <Package className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Rewards',
                  icon: <Gift className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'View User Feedback',
                  icon: <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
                { 
                  label: 'Manage Payments',
                  icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 mx-auto text-green-600" />
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-green-500 hover:shadow-md transition-all text-center flex flex-col items-center justify-center"
                >
                  <div className="mb-2 sm:mb-3">{action.icon}</div>
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
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Eco Points Balance Distribution Among Users</h3>
              <div className="flex flex-col items-end gap-2">
                <button className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span>Filter</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Legend */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#99E6B3' }}></div>
                    <span className="text-sm text-gray-900">Positive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF6666' }}></div>
                    <span className="text-sm text-gray-900">Negative</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative w-full overflow-x-auto">
              <div style={{ minWidth: '800px', height: '320px' }}>
                <svg width="100%" height="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid meet">
                  {/* Grid Lines */}
                  <line x1="50" y1="40" x2="50" y2="280" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="50" y1="40" x2="780" y2="40" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="50" y1="120" x2="780" y2="120" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="50" y1="200" x2="780" y2="200" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="50" y1="280" x2="780" y2="280" stroke="#E5E7EB" strokeWidth="1" />
                  
                  {/* Zero Line */}
                  <line x1="50" y1="200" x2="780" y2="200" stroke="#9CA3AF" strokeWidth="1" />
                  
                  {/* Y-axis Labels */}
                  <text x="45" y="45" textAnchor="end" fill="#9CA3AF" fontSize="12" fontFamily="sans-serif" fontWeight="400">100</text>
                  <text x="45" y="125" textAnchor="end" fill="#9CA3AF" fontSize="12" fontFamily="sans-serif" fontWeight="400">50</text>
                  <text x="45" y="205" textAnchor="end" fill="#9CA3AF" fontSize="12" fontFamily="sans-serif" fontWeight="400">0</text>
                  <text x="45" y="285" textAnchor="end" fill="#9CA3AF" fontSize="12" fontFamily="sans-serif" fontWeight="400">-50</text>
                  
                  {/* Sample data matching the figure pattern */}
                  {[
                    { positive: 75, negative: -15 }, // May 1
                    { positive: 82, negative: -12 }, // May 2
                    { positive: 78, negative: -18 }, // May 3
                    { positive: 85, negative: -14 }, // May 4
                    { positive: 80, negative: -16 }, // May 5
                    { positive: 55, negative: -20 }, // May 6 (dip)
                    { positive: 70, negative: -15 }, // May 7
                    { positive: 88, negative: -12 }, // May 8
                    { positive: 58, negative: -18 }, // May 9 (dip)
                    { positive: 75, negative: -14 }, // May 10
                    { positive: 82, negative: -16 }, // May 11
                    { positive: 79, negative: -15 }, // May 12
                    { positive: 86, negative: -13 }, // May 13
                    { positive: 81, negative: -17 }, // May 14
                    { positive: 84, negative: -14 }, // May 15
                    { positive: 77, negative: -16 }, // May 16
                    { positive: 80, negative: -15 }, // May 17
                  ].map((data, i) => {
                    const barWidth = 16;
                    const barSpacing = 14;
                    const startX = 60;
                    const xPos = startX + i * (barWidth + barSpacing) + barWidth / 2;
                    const zeroY = 200;
                    const maxHeight = 160; // Height for 100 units (from 0 to 100)
                    const minHeight = 160; // Height for -50 units (from 0 to -50)
                    
                    // Calculate bar heights
                    const positiveHeight = (data.positive / 100) * maxHeight;
                    const negativeHeight = Math.abs((data.negative / 50) * minHeight);
                    
                    // Calculate bar positions
                    const positiveY = zeroY - positiveHeight;
                    const negativeY = zeroY;
                    
                    return (
                      <g key={i}>
                        {/* Positive bar (light green) */}
                        <rect
                          x={xPos - barWidth / 2}
                          y={positiveY}
                          width={barWidth}
                          height={positiveHeight}
                          fill="#99E6B3"
                          rx="2"
                        />
                        {/* Negative bar (red) */}
                        <rect
                          x={xPos - barWidth / 2}
                          y={negativeY}
                          width={barWidth}
                          height={negativeHeight}
                          fill="#FF6666"
                          rx="2"
                        />
                        {/* X-axis label (every 2 days: May 1, 3, 5, 7, 9, 11, 13, 15, 17) */}
                        {i % 2 === 0 && (
                          <text
                            x={xPos}
                            y="300"
                            textAnchor="middle"
                            fill="#9CA3AF"
                            fontSize="11"
                            fontFamily="sans-serif"
                            fontWeight="400"
                          >
                            May {i + 1}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Distribution of E-waste Donations</h3>
              <select className="border border-gray-300 rounded px-2 sm:px-3 py-1 text-xs sm:text-sm w-full sm:w-auto">
                <option>Filter</option>
              </select>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
              {/* Categories List - Left Side */}
              <div className="flex-1 space-y-3 sm:space-y-4 w-full lg:w-auto">
                {[
                  { label: 'Computers and accessories', value: '35%', color: '#065F46' }, 
                  { label: 'Mobile phones and tablets', value: '25%', color: '#047857' }, 
                  { label: 'TVs and monitors', value: '15%', color: '#059669' }, 
                  { label: 'Batteries', value: '10%', color: '#10B981' }, 
                  { label: 'Other electronic devices', value: '10%', color: '#34D399' }, 
                  { label: 'Appliances', value: '5%', color: '#6EE7B7' }, 
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm sm:text-base">
                    <div className="flex items-center flex-1 min-w-0">
                      <div 
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded mr-3 flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 ml-4 flex-shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Donut Chart - Right Side */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Total Donations</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">1,000</p>
                    </div>
                  </div>
                  
                  {/* Donut Chart SVG */}
                  <svg 
                    className="w-full h-full transform -rotate-90" 
                    viewBox="0 0 100 100"
                  >
                    {/* Chart data: percentages */}
                    {[
                      { percent: 35, color: '#065F46', offset: 0 },
                      { percent: 25, color: '#047857', offset: 35 },
                      { percent: 15, color: '#059669', offset: 60 },
                      { percent: 10, color: '#10B981', offset: 75 },
                      { percent: 10, color: '#34D399', offset: 85 },
                      { percent: 5, color: '#6EE7B7', offset: 95 },
                    ].map((segment, i) => {
                      const circumference = 2 * Math.PI * 40; // radius = 40
                      const strokeDasharray = `${(segment.percent / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((segment.offset / 100) * circumference);
                      
                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={segment.color}
                          strokeWidth="12"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
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
