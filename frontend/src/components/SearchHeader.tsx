
import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

interface SearchHeaderProps {
  onSearch: (query: string, city: string, category: string) => void;
  loading: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad'
  ];

  const categories = [
    'Cafes', 'Restaurants', 'Parks', 'Gyms', 'Bars', 'Libraries', 'Co-working Spaces', 'Museums'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && category) {
      onSearch(query, city, category);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Natural Language Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Tell me about cozy cafes with good WiFi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg bg-white/80 backdrop-blur-sm border-2 border-white/20 focus:border-purple-300 rounded-xl"
          />
        </div>

        {/* City and Category Selection */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-white/20 rounded-xl">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(cityName => (
                  <SelectItem key={cityName} value={cityName}>{cityName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-white/20 rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            disabled={!city || !category || loading}
            className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              'Discover Vibes ✨'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
