
import React, { useState } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { VibeCards } from '@/components/VibeCards';
import { PersonalizedChat } from '@/components/PersonalizedChat';
import { CategoryFilters } from '@/components/CategoryFilter';
import { LocationMap } from '@/components/LocationMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  Users, 
  Heart
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold text-shimmer">
                Vibe Navigator
              </h1>
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Discover your city's perfect spots through{" "}
              <span className="text-primary font-semibold">AI-powered vibe analysis</span>{" "}
              of real user reviews
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Location-based</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>Real reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <span>Vibe-matched</span>
              </div>
            </div>
            <SearchHeader onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </section>

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
