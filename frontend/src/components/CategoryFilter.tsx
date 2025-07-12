
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryFiltersProps {
  activeVibeTags: string[];
  onVibeTagToggle: (tag: string) => void;
  selectedCategory: string;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeVibeTags,
  onVibeTagToggle,
  selectedCategory
}) => {
  const vibeOptions = [
    { tag: 'aesthetic', emoji: '✨', color: 'purple' },
    { tag: 'quiet', emoji: '🤫', color: 'blue' },
    { tag: 'lively', emoji: '🎉', color: 'orange' },
    { tag: 'nature-filled', emoji: '🌿', color: 'green' },
    { tag: 'cozy', emoji: '🛋️', color: 'amber' },
    { tag: 'budget-friendly', emoji: '💰', color: 'emerald' },
    { tag: 'instagram-worthy', emoji: '📸', color: 'pink' },
    { tag: 'pet-friendly', emoji: '🐕', color: 'cyan' },
    { tag: 'work-friendly', emoji: '💻', color: 'slate' },
    { tag: 'romantic', emoji: '💕', color: 'rose' }
  ];

  const clearAllFilters = () => {
    activeVibeTags.forEach(tag => onVibeTagToggle(tag));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter by Vibe {selectedCategory && `• ${selectedCategory}`}
        </h3>
        {activeVibeTags.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {vibeOptions.map((option) => {
          const isActive = activeVibeTags.includes(option.tag);
          return (
            <motion.div
              key={option.tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={isActive ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? `bg-${option.color}-100 text-${option.color}-800 border-${option.color}-300 hover:bg-${option.color}-200`
                    : 'hover:bg-gray-50 border-gray-300'
                }`}
                onClick={() => onVibeTagToggle(option.tag)}
              >
                <span className="mr-2">{option.emoji}</span>
                {option.tag}
              </Badge>
            </motion.div>
          );
        })}
      </div>

      {activeVibeTags.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600"
        >
          <span>Active filters:</span>
          {activeVibeTags.map((tag) => {
            const option = vibeOptions.find(opt => opt.tag === tag);
            return (
              <Badge key={tag} variant="secondary" className="text-xs">
                {option?.emoji} {tag}
              </Badge>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
