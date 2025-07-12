
import React, { useState } from 'react';
import { Star, MapPin, Users, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

interface VibeCardProps {
  results: any[];
  loading: boolean;
  activeVibeTags: string[];
}

export const VibeCards: React.FC<VibeCardProps> = ({ results, loading, activeVibeTags }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <Card className="h-80">
              <div className="bg-gray-200 h-full rounded-lg" />
            </Card>
          </div>
        ))}
      </div>
    );
  }

  const filteredResults = activeVibeTags.length > 0 
    ? results.filter(result => 
        activeVibeTags.some(tag => result.vibeTags.includes(tag))
      )
    : results;

  return (
    <div className="space-y-6">
      {filteredResults.length > 0 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Found {filteredResults.length} perfect vibe{filteredResults.length !== 1 ? 's' : ''} for you! 🎉
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      {location.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.location}
                    </div>
                  </div>
                  <div className="text-2xl">{location.mood}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold">{location.vibeScore}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {location.reviewCount} reviews
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {location.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {location.vibeTags.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant={activeVibeTags.includes(tag) ? "default" : "secondary"}
                      className={`text-xs ${
                        activeVibeTags.includes(tag) 
                          ? 'bg-purple-100 text-purple-800 border-purple-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                    >
                      <Quote className="h-4 w-4 mr-2" />
                      View Review Citations
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        {location.name} - Review Citations
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">AI Summary</h3>
                        <p className="text-gray-700">{location.summary}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Source Reviews:</h3>
                        {location.citedReviews.map((review: any) => (
                          <div key={review.id} className="border-l-4 border-blue-200 pl-4 py-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{review.platform}</Badge>
                              <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 italic">"{review.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
