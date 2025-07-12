
import React, { useState } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { VibeCards } from '@/components/VibeCards';
import { PersonalizedChat } from '@/components/PersonalizedChat';
import { CategoryFilters } from '@/components/CategoryFilter';
import { LocationMap } from '@/components/LocationMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeVibeTags, setActiveVibeTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string, city: string, category: string) => {
    setLoading(true);
    setSearchQuery(query);
    setSelectedCity(city);
    setSelectedCategory(category);
    
    // Simulate API call - replace with actual backend integration
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: "Café Mocha Dreams",
          location: "Connaught Place, Delhi",
          vibeScore: 4.8,
          primaryVibe: "cozy",
          vibeTags: ["aesthetic", "quiet", "instagram-worthy", "budget-friendly"],
          summary: "A hidden gem tucked away from the bustling streets, where vintage decor meets modern coffee culture. Perfect for deep conversations and creative work.",
          mood: "☕🌿📚✨",
          reviewCount: 247,
          citedReviews: [
            { id: 1, text: "Love the vintage vibes and peaceful atmosphere", platform: "Google Maps", rating: 5 },
            { id: 2, text: "Perfect spot for working with great coffee", platform: "TripAdvisor", rating: 4 }
          ]
        },
        {
          id: 2,
          name: "Brew & Bloom Garden Café",
          location: "Hauz Khas Village, Delhi",
          vibeScore: 4.6,
          primaryVibe: "lively",
          vibeTags: ["nature-filled", "lively", "pet-friendly", "organic"],
          summary: "Where urban jungle meets coffee culture! This open-air paradise combines lush greenery with energetic vibes and sustainable practices.",
          mood: "🌱🎶☀️🐕",
          reviewCount: 189,
          citedReviews: [
            { id: 3, text: "Amazing garden setting, very Instagram worthy!", platform: "Reddit", rating: 5 },
            { id: 4, text: "Great for groups, love the sustainable focus", platform: "Google Maps", rating: 4 }
          ]
        }
      ]);
      setLoading(false);
    }, 2000);
  };

  const handleVibeTagToggle = (tag: string) => {
    setActiveVibeTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Vibe Navigator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the perfect spots with AI-powered vibe analysis from real reviews ✨
            </p>
          </motion.div>

          <SearchHeader onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">🔍 Discover</TabsTrigger>
            <TabsTrigger value="chat">💬 AI Concierge</TabsTrigger>
            <TabsTrigger value="map">🗺️ Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <CategoryFilters 
              activeVibeTags={activeVibeTags}
              onVibeTagToggle={handleVibeTagToggle}
              selectedCategory={selectedCategory}
            />
            
            <AnimatePresence>
              <VibeCards 
                results={searchResults} 
                loading={loading}
                activeVibeTags={activeVibeTags}
              />
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="chat">
            <PersonalizedChat 
              searchContext={{ city: selectedCity, category: selectedCategory }}
              vibePreferences={activeVibeTags}
            />
          </TabsContent>

          <TabsContent value="map">
            <LocationMap locations={searchResults} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
