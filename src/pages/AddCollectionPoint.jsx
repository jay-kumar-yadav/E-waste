import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../config/api';

const AddCollectionPoint = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    address: '',
    latitude: '',
    longitude: '',
    name: '',
    email: '',
    wasteType: '',
    condition: '',
    yearsOfUse: '',
    optional: ''
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [geocodingAddress, setGeocodingAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [detailedAddress, setDetailedAddress] = useState({
    street: '',
    landmark: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Define form steps
  const formSteps = [
    {
      id: 'address',
      label: 'Address with Current Location',
      type: 'address',
      required: true,
      placeholder: 'Enter address or click to use current location'
    },
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter your email'
    },
    {
      id: 'wasteType',
      label: 'Type of Waste',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select waste type' },
        { value: 'computers', label: 'Computers and Laptops' },
        { value: 'smartphones', label: 'Smartphones and Tablets' },
        { value: 'televisions', label: 'Televisions' },
        { value: 'printers', label: 'Printers and Scanners' },
        { value: 'gaming', label: 'Gaming Consoles' },
        { value: 'batteries', label: 'Batteries' },
        { value: 'appliances', label: 'Home Appliances' },
        { value: 'other', label: 'Other Electronic Devices' }
      ]
    },
    {
      id: 'condition',
      label: 'Condition of Waste',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select condition' },
        { value: 'excellent', label: 'Excellent - Like New' },
        { value: 'good', label: 'Good - Minor Wear' },
        { value: 'fair', label: 'Fair - Some Damage' },
        { value: 'poor', label: 'Poor - Significant Damage' },
        { value: 'broken', label: 'Broken - Not Working' }
      ]
    },
    {
      id: 'yearsOfUse',
      label: 'How Many Years of Use',
      type: 'number',
      required: true,
      placeholder: 'e.g., 2.5',
      min: 0,
      max: 50,
      step: 0.5
    },
    {
      id: 'optional',
      label: 'Additional Notes (Optional)',
      type: 'textarea',
      required: false,
      placeholder: 'Any additional information about the waste item...',
      rows: 4
    }
  ];

  useEffect(() => {
    // Get user from localStorage and verify token
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      return;
    }
    
    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setFormData(prev => ({
        ...prev,
        name: userObj.name || '',
        email: userObj.email || ''
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error parsing user data:', error);
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }

    // Load Google Maps API (non-blocking - form works without it)
    if (!window.google) {
      try {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        script.onerror = () => {
          console.warn('Google Maps API failed to load. Address autocomplete will not work.');
          setMapLoaded(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapLoaded(false);
      }
    } else {
      setMapLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (mapLoaded && window.google && window.google.maps && window.google.maps.places) {
      initializeMap();
    }
  }, [mapLoaded, currentStep]);

  const initializeMap = () => {

    if (currentStep !== 0) return;

    try {

      setTimeout(() => {
        const addressInput = document.getElementById('address-input');
        if (addressInput && window.google && window.google.maps && window.google.maps.places) {
          const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
            types: ['address'],
            componentRestrictions: { country: 'in' }
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              setFormData(prev => ({
                ...prev,
                address: place.formatted_address || place.name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
              }));
            }
          });
        }
      }, 100);
    } catch (error) {
      console.error('Error initializing map autocomplete:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
    }

    const currentField = formSteps[currentStep];

    if (currentField.required && !formData[currentField.id]) {
      toast.error(`Please fill in ${currentField.label}`);
      return;
    }


    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const areAllRequiredFieldsFilled = () => {
    const requiredSteps = formSteps.filter(step => step.required);
    return requiredSteps.every(step => {
      const value = formData[step.id];
      if (value === null || value === undefined || value === '') {
        return false;
      }
      const stringValue = String(value).trim();
      return stringValue !== '';
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all required fields
    const missingFields = formSteps
      .filter(step => step.required && !formData[step.id])
      .map(step => step.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      // Create collection point via API
      await api.collectionPoints.create(formData);
      
      toast.success('Collection point submitted successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast.error(error.message || 'Failed to submit collection point. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to continue</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-green-800 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
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
          <span className="text-sm sm:text-base font-medium">Back to Dashboard</span>
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Add Collection Point</h1>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {formSteps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / formSteps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === formSteps.length - 1) {

              if (areAllRequiredFieldsFilled()) {
                handleSubmit(e);
              } else {
                const missingFields = formSteps
                  .filter(step => step.required && (!formData[step.id] || String(formData[step.id]).trim() === ''))
                  .map(step => step.label);
                toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
              }
            } else {

              handleNext(e);
            }
          }}>

            <div className="min-h-[400px] flex flex-col justify-center">
              {formSteps.map((step, index) => {
                if (index !== currentStep) return null;

                return (
                  <div key={step.id} className="space-y-4 animate-fade-in">
                    <div className="text-center mb-8">
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        {step.label}
                      </h2>
                      {step.required && (
                        <p className="text-sm text-gray-500">This field is required</p>
                      )}
                    </div>

                    <div className="max-w-md mx-auto w-full">
                      {/* Address Field */}
                      {step.type === 'address' && (
                        <div>
                          <input
                            id="address-input"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder={step.placeholder}
                            required={step.required}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              if (navigator.geolocation) {
                                setGeocodingAddress(true);
                                navigator.geolocation.getCurrentPosition(
                                  async (position) => {
                                    const { latitude, longitude } = position.coords;

                                    // First, save coordinates
                                    setFormData(prev => ({
                                      ...prev,
                                      latitude: latitude.toString(),
                                      longitude: longitude.toString()
                                    }));

                                    // Try to get address using Google Maps Geocoder
                                    if (window.google && window.google.maps) {
                                      try {
                                        const geocoder = new window.google.maps.Geocoder();
                                        geocoder.geocode(
                                          { location: { lat: latitude, lng: longitude } },
                                          (results, status) => {
                                            setGeocodingAddress(false);
                                            if (status === 'OK' && results && results.length > 0) {
                                              // Use the formatted address
                                              const address = results[0].formatted_address;
                                              setFormData(prev => ({
                                                ...prev,
                                                address: address
                                              }));
                                            } else {
                                              
                                              toast.warning('Could not get address name. Please enter address manually.');
                                            }
                                          }
                                        );
                                      } catch (error) {
                                        setGeocodingAddress(false);
                                        console.error('Error geocoding:', error);
                                        // Try alternative: use OpenStreetMap Nominatim API
                                        try {
                                          const response = await fetch(
                                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                                          );
                                          const data = await response.json();
                                          if (data && data.display_name) {
                                            setFormData(prev => ({
                                              ...prev,
                                              address: data.display_name
                                            }));
                                          } else {
                                            toast.warning('Could not get address name. Please enter address manually.');
                                          }
                                        } catch (osmError) {
                                          toast.warning('Could not get address name. Please enter address manually.');
                                        }
                                      }
                                    } else {
                                      // If Google Maps not loaded, try OpenStreetMap
                                      try {
                                        const response = await fetch(
                                          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                                        );
                                        const data = await response.json();
                                        setGeocodingAddress(false);
                                        if (data && data.display_name) {
                                          setFormData(prev => ({
                                            ...prev,
                                            address: data.display_name
                                          }));
                                        } else {
                                          toast.warning('Could not get address name. Please enter address manually.');
                                        }
                                      } catch (error) {
                                        setGeocodingAddress(false);
                                        toast.warning('Could not get address name. Please enter address manually.');
                                      }
                                    }
                                  },
                                  (error) => {
                                    setGeocodingAddress(false);
                                    toast.error('Unable to get your location. Please enter address manually.');
                                  }
                                );
                              } else {
                                toast.error('Geolocation is not supported by your browser.');
                              }
                            }}
                            disabled={geocodingAddress}
                            className={`mt-3 w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium ${geocodingAddress
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                          >
                            {geocodingAddress ? '📍 Getting address...' : '📍 Use Current Location'}
                          </button>
                          {formData.address && (
                            <button
                              type="button"
                              onClick={() => {
                                
                                const addressParts = formData.address.split(',');
                                if (addressParts.length > 1) {
                                 
                                  setDetailedAddress({
                                    street: addressParts[0]?.trim() || '',
                                    landmark: '',
                                    city: addressParts[addressParts.length - 3]?.trim() || addressParts[addressParts.length - 2]?.trim() || '',
                                    state: addressParts[addressParts.length - 2]?.trim() || addressParts[addressParts.length - 1]?.trim() || '',
                                    zipCode: '',
                                    country: addressParts[addressParts.length - 1]?.trim() || ''
                                  });
                                }
                                setShowEditAddress(true);
                              }}
                              className="mt-3 w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                            >
                               Edit Address Details
                            </button>
                          )}
                        </div>
                      )}

                      {/* Text Input */}
                      {step.type === 'text' && (
                        <input
                          id={step.id}
                          type="text"
                          name={step.id}
                          value={formData[step.id]}
                          onChange={handleChange}
                          placeholder={step.placeholder}
                          required={step.required}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          autoFocus
                        />
                      )}

                      {/* Email Input */}
                      {step.type === 'email' && (
                        <input
                          id={step.id}
                          type="email"
                          name={step.id}
                          value={formData[step.id]}
                          onChange={handleChange}
                          placeholder={step.placeholder}
                          required={step.required}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          autoFocus
                        />
                      )}

                      {/* Number Input */}
                      {step.type === 'number' && (
                        <input
                          id={step.id}
                          type="number"
                          name={step.id}
                          value={formData[step.id]}
                          onChange={handleChange}
                          placeholder={step.placeholder}
                          min={step.min}
                          max={step.max}
                          step={step.step}
                          required={step.required}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          autoFocus
                        />
                      )}

                      {/* Select Dropdown */}
                      {step.type === 'select' && (
                        <select
                          id={step.id}
                          name={step.id}
                          value={formData[step.id]}
                          onChange={handleChange}
                          required={step.required}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          autoFocus
                        >
                          {step.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* Textarea */}
                      {step.type === 'textarea' && (
                        <textarea
                          id={step.id}
                          name={step.id}
                          value={formData[step.id]}
                          onChange={handleChange}
                          placeholder={step.placeholder}
                          rows={step.rows}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                ← Previous
              </button>

              {currentStep < formSteps.length - 1 ? (
                // Not on last step (steps 1-6) -> Show Next
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext(e);
                  }}
                  className="px-8 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  style={{ backgroundColor: '#2E6A56' }}
                >
                  Next →
                </button>
              ) : (
                
                areAllRequiredFieldsFilled() ? (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    style={{ backgroundColor: '#2E6A56' }}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const missingFields = formSteps
                        .filter(step => step.required && (!formData[step.id] || String(formData[step.id]).trim() === ''))
                        .map(step => step.label);
                      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
                    }}
                    className="px-8 py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                    disabled
                  >
                    Fill All Fields
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Edit Address Modal */}
      {showEditAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Address Details</h2>
                <button
                  onClick={() => setShowEditAddress(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Combine all address fields into a formatted address
                  const addressParts = [];
                  if (detailedAddress.street) addressParts.push(detailedAddress.street);
                  if (detailedAddress.landmark) addressParts.push(`Near ${detailedAddress.landmark}`);
                  if (detailedAddress.city) addressParts.push(detailedAddress.city);
                  if (detailedAddress.state) addressParts.push(detailedAddress.state);
                  if (detailedAddress.zipCode) addressParts.push(detailedAddress.zipCode);
                  if (detailedAddress.country) addressParts.push(detailedAddress.country);

                  const formattedAddress = addressParts.join(', ');

                  if (formattedAddress) {
                    setFormData(prev => ({
                      ...prev,
                      address: formattedAddress
                    }));
                  }

                  setShowEditAddress(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="street"
                    type="text"
                    value={detailedAddress.street}
                    onChange={(e) => setDetailedAddress(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="House/Flat No., Building Name, Street"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    value={detailedAddress.landmark}
                    onChange={(e) => setDetailedAddress(prev => ({ ...prev, landmark: e.target.value }))}
                    placeholder="Nearby landmark or place"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={detailedAddress.city}
                      onChange={(e) => setDetailedAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="City"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={detailedAddress.state}
                      onChange={(e) => setDetailedAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="State"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP/Pin Code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      value={detailedAddress.zipCode}
                      onChange={(e) => setDetailedAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      placeholder="ZIP/Pin Code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={detailedAddress.country}
                      onChange={(e) => setDetailedAddress(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="Country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditAddress(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-800 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    style={{ backgroundColor: '#2E6A56' }}
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AddCollectionPoint;
