
import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalizedChatProps {
  searchContext: { city: string; category: string };
  vibePreferences: string[];
}

export const PersonalizedChat: React.FC<PersonalizedChatProps> = ({
  searchContext,
  vibePreferences
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hey there! 👋 I'm your personal vibe concierge. I see you're interested in ${searchContext.category?.toLowerCase() || 'exploring'} in ${searchContext.city || 'your city'}. What kind of experience are you looking for today?`,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQueries = [
    "Find me a cozy spot for a first date",
    "Where can I work remotely with great coffee?",
    "I want somewhere Instagram-worthy with good food",
    "Recommend a quiet place to read and study",
    "Show me lively spots perfect for groups"
  ];

  const handleSendMessage = async (message: string = currentMessage) => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, searchContext, vibePreferences);
      const newBotMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (query: string, context: any, preferences: string[]) => {
    const responses = [
      `Perfect! Based on your preferences for ${preferences.join(', ')} vibes in ${context.city}, I've got some amazing recommendations. Let me tell you about "Mystic Brew Café" - reviewers on Google Maps say it's "like stepping into a fairy tale" with "the most aesthetic interior I've ever seen." One TripAdvisor user mentioned it's "perfect for deep conversations over perfectly crafted lattes." ☕✨`,
      
      `Oh, I love this request! For ${context.category?.toLowerCase()} with that vibe, there's this hidden gem called "The Garden Hideaway." A Reddit user described it as "my go-to spot when I need to feel inspired" and another mentioned "the plants everywhere make it feel like working in a secret garden." The WiFi is apparently fantastic too! 🌿💻`,
      
      `Great question! I'm thinking of "Sunset Terrace" - the reviews are incredible. One person wrote on Google Maps: "Every corner is Instagram gold, but the food is what keeps me coming back." Another mentioned it's "buzzing with creative energy but not overwhelmingly loud." Perfect for your vibe! 📸🍽️`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Context Display */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-600" />
            <span>AI Vibe Concierge</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {searchContext.city && (
              <Badge variant="outline" className="bg-white">
                📍 {searchContext.city}
              </Badge>
            )}
            {searchContext.category && (
              <Badge variant="outline" className="bg-white">
                🏢 {searchContext.category}
              </Badge>
            )}
            {vibePreferences.map(pref => (
              <Badge key={pref} variant="secondary" className="bg-purple-100 text-purple-800">
                ✨ {pref}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="h-96 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-4 w-4 mt-1 text-purple-600" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-4 w-4 mt-1" />
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>

        {/* Input Area */}
        <div className="border-t p-4 space-y-3">
          {/* Suggested Queries */}
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.slice(0, 3).map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(query)}
                className="text-xs bg-purple-50 border-purple-200 hover:bg-purple-100"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {query}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask me about vibes, locations, or anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
