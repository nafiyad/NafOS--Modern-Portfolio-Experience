import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye, MapPin, Loader2 } from 'lucide-react';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    humidity: number;
    vis_km: number;
    vis_miles: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

interface WeatherWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ isOpen, onClose }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [locationDetecting, setLocationDetecting] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  const API_KEY = '606542430a44481cbf8181205241708';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  const fetchWeatherByLocation = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLocationDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ lat: latitude, lon: longitude });
        setLocationDetecting(false);
        setLocationPermissionDenied(false);
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        setLocationDetecting(false);
        setLocationPermissionDenied(true);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services or search manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable. Please search manually.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please search manually.');
            break;
          default:
            setError('An unknown error occurred. Please search manually.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    if (isOpen && !weatherData && !locationPermissionDenied) {
      detectUserLocation();
    }
  }, [isOpen]);

  const getWeatherIcon = (code: number) => {
    if (code >= 1000 && code <= 1003) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (code >= 1006 && code <= 1030) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 1063 && code <= 1201) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 1204 && code <= 1282) return <CloudSnow className="w-8 h-8 text-blue-200" />;
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newLocation = formData.get('location') as string;
    if (newLocation.trim()) {
      setLocation(newLocation.trim());
      fetchWeatherByLocation(newLocation.trim());
    }
  };

  const handleDetectLocation = () => {
    setLocationPermissionDenied(false);
    detectUserLocation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9, y: -20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: -20 }}
             className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] max-h-[calc(100vh-120px)] z-[9999] pointer-events-none"
           >
            <div
              className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl pointer-events-auto overflow-y-auto max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Weather</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              className="px-3 py-1 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all text-gray-100 text-sm border border-gray-600/30"
            >
              °{unit}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all text-gray-100 border border-gray-600/30"
            >
              ×
            </button>
          </div>
        </div>

        {/* Location Search */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-2">
            <button
                onClick={handleDetectLocation}
                disabled={locationDetecting}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/80 hover:bg-green-600 border border-green-500/50 rounded-lg text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {locationDetecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
                {locationDetecting ? 'Detecting...' : 'Use My Location'}
              </button>
              
              {weatherData && (
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-700/50 rounded-lg text-gray-200 text-sm border border-gray-600/30">
                  <MapPin className="w-3 h-3" />
                  {weatherData.location.name}, {weatherData.location.country}
                </div>
              )}
          </div>
          
          <form onSubmit={handleLocationSubmit}>
            <div className="flex gap-2">
              <input
                 name="location"
                 type="text"
                 placeholder="Or enter city name..."
                 className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/30"
                 defaultValue={location}
               />
               <button
                 type="submit"
                 className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 transition-all text-gray-100 font-medium"
               >
                 Search
               </button>
            </div>
          </form>
        </div>

        {/* Weather Content */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={() => fetchWeatherByLocation(location)}
              className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 transition-all text-gray-100 font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {weatherData && !loading && !error && (
          <div className="space-y-6">
            {/* Main Weather Info */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getWeatherIcon(weatherData.current.condition.code)}
              </div>
              <h3 className="text-lg font-medium text-gray-100 mb-1">
                {weatherData.location.name}, {weatherData.location.country}
              </h3>
              <p className="text-3xl font-bold text-gray-100 mb-1">
                {unit === 'C' ? Math.round(weatherData.current.temp_c) : Math.round(weatherData.current.temp_f)}°{unit}
              </p>
              <p className="text-gray-300 mb-2">{weatherData.current.condition.text}</p>
              <p className="text-sm text-gray-400">
                Feels like {unit === 'C' ? Math.round(weatherData.current.feelslike_c) : Math.round(weatherData.current.feelslike_f)}°{unit}
              </p>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Wind</span>
                </div>
                <p className="text-gray-100 font-medium">
                  {Math.round(weatherData.current.wind_kph)} km/h
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Humidity</span>
                </div>
                <p className="text-gray-100 font-medium">{weatherData.current.humidity}%</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Visibility</span>
                </div>
                <p className="text-gray-100 font-medium">{weatherData.current.vis_km} km</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/30">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Pressure</span>
                </div>
                <p className="text-gray-100 font-medium">Normal</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Last updated: {new Date(weatherData.location.localtime).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WeatherWidget;