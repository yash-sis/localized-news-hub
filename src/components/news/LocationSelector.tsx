
import { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function LocationSelector({ 
  selectedLocation, 
  onLocationChange 
}: LocationSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Available locations from our news sources
  const availableLocations = [
    'San Francisco', 
    'Oakland', 
    'Mission District, SF', 
    'Berkeley',
    'Palo Alto',
    'San Jose'
  ];

  // Get user's geolocation
  const getUserLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // For demo purposes, we'll just set to San Francisco
          // In a real app, we would convert coordinates to city name using a geocoding API
          onLocationChange('San Francisco');
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 pl-3 pr-2 rounded-full border-muted-foreground/30"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{selectedLocation}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start font-normal"
              onClick={getUserLocation}
              disabled={isLoading}
            >
              {isLoading ? 'Getting location...' : 'Use my current location'}
            </Button>
            
            <div className="py-1">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1">
                Available Locations
              </div>
              {availableLocations.map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                  onClick={() => onLocationChange(location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default LocationSelector;
