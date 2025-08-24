import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, MapPin, Thermometer, Droplets, Eye, Gauge, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    pressure_mb: number;
    vis_km: number;
    feelslike_c: number;
    feelslike_f: number;
  };
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Calgary');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null);

  const API_KEY = '606542430a44481cbf8181205241708';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching weather by coordinates:', err);
      throw err;
    }
  };

  const fetchWeatherByLocation = async (locationName: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${locationName}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching weather by location:', err);
      throw err;
    }
  };

  const updateWeatherState = (data: WeatherData) => {
    setWeather(data);
    setLocation(`${data.location.name}, ${data.location.region}`);
    setLoading(false);
    setError(null);
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    } else if (lowerCondition.includes('snow') || lowerCondition.includes('blizzard')) {
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <Cloud className="w-16 h-16 text-gray-400" />;
    } else if (lowerCondition.includes('wind')) {
      return <Wind className="w-16 h-16 text-gray-500" />;
    } else if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return <Sun className="w-16 h-16 text-yellow-400" />;
    } else {
      return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  useEffect(() => {
    const initializeWeather = async () => {
      setLoading(true);
      
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            setUserCoords(coords);
            
            try {
              const data = await fetchWeatherByCoords(coords.latitude, coords.longitude);
              updateWeatherState(data);
            } catch (err) {
              // Fallback to default location
              try {
                const data = await fetchWeatherByLocation('Calgary');
                updateWeatherState(data);
              } catch (fallbackErr) {
                setError('Unable to fetch weather data');
                setLoading(false);
              }
            }
          },
          async () => {
            // Geolocation denied, use default location
            try {
              const data = await fetchWeatherByLocation('Calgary');
              updateWeatherState(data);
            } catch (err) {
              setError('Unable to fetch weather data');
              setLoading(false);
            }
          }
        );
      } else {
        // Geolocation not supported, use default location
        try {
          const data = await fetchWeatherByLocation('Calgary');
          updateWeatherState(data);
        } catch (err) {
          setError('Unable to fetch weather data');
          setLoading(false);
        }
      }
    };

    initializeWeather();
  }, []);

  const handleLocationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchLocation = formData.get('location') as string;
    
    if (!searchLocation.trim()) return;
    
    setLoading(true);
    try {
      const data = await fetchWeatherByLocation(searchLocation);
      updateWeatherState(data);
    } catch (err) {
      setError('Location not found');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Weather</h1>
          <p className="text-gray-400">Current weather conditions and forecast</p>
        </div>

        {/* Location Search */}
        <form onSubmit={handleLocationSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              name="location"
              placeholder="Search for a city..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
            >
              Search
            </button>
          </div>
        </form>

        {weather && (
          <div className="space-y-6">
            {/* Current Weather Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-frosted border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{weather.location.name}, {weather.location.region}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{weather.current.condition.text}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                    className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                  >
                    °{unit}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {getWeatherIcon(weather.current.condition.text)}
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">
                      {unit === 'C' ? Math.round(weather.current.temp_c) : Math.round(weather.current.temp_f)}°
                    </div>
                    <div className="text-gray-400">
                      Feels like {unit === 'C' ? Math.round(weather.current.feelslike_c) : Math.round(weather.current.feelslike_f)}°
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-frosted border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-white">{weather.current.humidity}%</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-frosted border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Wind className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {Math.round(weather.current.wind_kph)} km/h
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-frosted border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Gauge className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-white">{weather.current.pressure_mb} mb</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-frosted border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">Visibility</span>
                </div>
                <div className="text-2xl font-bold text-white">{weather.current.vis_km} km</div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};