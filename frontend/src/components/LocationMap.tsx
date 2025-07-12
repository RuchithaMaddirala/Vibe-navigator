
import React from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LocationMapProps {
  locations: any[];
}

export const LocationMap: React.FC<LocationMapProps> = ({ locations }) => {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card className="h-96 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Map Coming Soon!</h3>
              <p className="text-gray-600 max-w-md">
                We're working on integrating OpenStreetMap to show you exactly where these amazing vibes are located.
              </p>
            </div>
            <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
              <Navigation className="h-4 w-4 mr-2" />
              Enable Location Services
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Nearby Locations</h3>
        <div className="grid gap-4">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{location.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.location}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{location.vibeScore}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {location.primaryVibe}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-2xl ml-4">{location.mood}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
