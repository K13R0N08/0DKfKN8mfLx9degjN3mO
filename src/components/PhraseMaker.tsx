import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Gift, Star, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Phrase {
  id: string;
  text: string;
  category: "love" | "celebration" | "motivation" | "friendship";
  keywords: string[];
}

const preApprovedPhrases: Phrase[] = [
  { id: "1", text: "Love You Forever", category: "love", keywords: ["love", "forever", "heart", "romantic"] },
  { id: "2", text: "Best Friend Ever", category: "friendship", keywords: ["friend", "best", "buddy", "pal"] },
  { id: "3", text: "Happy Birthday!", category: "celebration", keywords: ["birthday", "happy", "celebration", "party"] },
  { id: "4", text: "You're Amazing", category: "motivation", keywords: ["amazing", "awesome", "great", "wonderful"] },
  { id: "5", text: "Sweet Dreams", category: "love", keywords: ["sweet", "dreams", "sleep", "night"] },
  { id: "6", text: "Congratulations!", category: "celebration", keywords: ["congrats", "celebration", "achievement", "success"] },
  { id: "7", text: "Stay Strong", category: "motivation", keywords: ["strong", "strength", "motivation", "power"] },
  { id: "8", text: "Missing You", category: "love", keywords: ["miss", "missing", "distance", "longing"] },
  { id: "9", text: "Good Luck!", category: "motivation", keywords: ["luck", "good", "fortune", "success"] },
  { id: "10", text: "Thank You", category: "friendship", keywords: ["thank", "thanks", "grateful", "appreciation"] },
  { id: "11", text: "You Rock!", category: "motivation", keywords: ["rock", "cool", "awesome", "epic"] },
];

const categoryIcons = {
  love: Heart,
  celebration: Gift,
  motivation: Star,
  friendship: Sparkles,
};

const categoryColors = {
  love: "bg-red-100 text-red-700 border-red-200",
  celebration: "bg-yellow-100 text-yellow-700 border-yellow-200",
  motivation: "bg-blue-100 text-blue-700 border-blue-200",
  friendship: "bg-green-100 text-green-700 border-green-200",
};

export default function PhraseMaker() {
  const [personName, setPersonName] = useState("");
  const [phraseInput, setPhraseInput] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const { toast } = useToast();

  const suggestions = useMemo(() => {
    const suggestions = [];
    
    if (phraseInput.trim()) {
      const searchTerm = phraseInput.toLowerCase();
      const matchingPhrases = preApprovedPhrases.filter(phrase => 
        phrase.text.toLowerCase().includes(searchTerm) ||
        phrase.keywords.some(keyword => keyword.includes(searchTerm))
      );

      matchingPhrases.forEach(phrase => {
        if (personName.trim()) {
          // With name: Generate personalized versions
          suggestions.push(`${personName}, ${phrase.text}`);
          
          if (phrase.text.endsWith('!')) {
            suggestions.push(`${phrase.text.slice(0, -1)} ${personName}!`);
          } else {
            suggestions.push(`${phrase.text} ${personName}!`);
          }
        } else {
          // Without name: Just the phrase
          suggestions.push(phrase.text);
        }
      });
    } else if (personName.trim()) {
      // Just name provided: Show popular phrases
      const popularPhrases = preApprovedPhrases.slice(0, 4);
      popularPhrases.forEach(phrase => {
        suggestions.push(`${personName}, ${phrase.text}`);
        
        if (phrase.text.endsWith('!')) {
          suggestions.push(`${phrase.text.slice(0, -1)} ${personName}!`);
        } else {
          suggestions.push(`${phrase.text} ${personName}!`);
        }
      });
    }

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  }, [personName, phraseInput]);

  const handleOrderSubmit = () => {
    if (!selectedSuggestion && !personName.trim() && !phraseInput.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a name, phrase, or select a suggestion to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Use selected suggestion or create from inputs
    const finalText = selectedSuggestion || 
      (personName.trim() && phraseInput.trim() ? `${personName}, ${phraseInput}` : 
       personName.trim() || phraseInput.trim());
    
    if (!finalText) {
      toast({
        title: "Missing Information",
        description: "Please provide some content for the can.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Created! 🎉",
      description: `Custom can with "${finalText}" has been added to your order.`,
    });
    
    // Reset form
    setPersonName("");
    setPhraseInput("");
    setSelectedSuggestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-end mb-4">
            <Link to="/admin">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Coca-Cola Moderation AI Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered content moderation for personalized Coca-Cola cans. 
            Enter customer details and our system suggests pre-approved, brand-safe phrases!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Customize Your Can
                </CardTitle>
                <CardDescription>
                  Enter a name, phrase, or both to get AI-powered suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Person's Name <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter name here..."
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="phrase" className="text-sm font-medium mb-2 block">
                    Start Typing Phrase <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="phrase"
                    placeholder="e.g., Happy, Love, Thank..."
                    value={phraseInput}
                    onChange={(e) => setPhraseInput(e.target.value)}
                    className="text-lg"
                  />
                </div>
                
                {selectedSuggestion && (
                  <div className="p-4 bg-gradient-hero rounded-lg border">
                    <h3 className="font-semibold mb-2">Selected Suggestion:</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {selectedSuggestion}
                      </Badge>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleOrderSubmit}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                  size="lg"
                >
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {suggestions.length > 0 ? "AI Suggestions" : "Enter name or phrase to see suggestions"}
            </h2>
            <div className="grid gap-3">
              {suggestions.map((suggestion, index) => {
                const isSelected = selectedSuggestion === suggestion;
                
                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                      isSelected ? "ring-2 ring-primary shadow-soft" : ""
                    }`}
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium">{suggestion}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {suggestions.length === 0 && phraseInput && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      No matching phrases found for "{phraseInput}". Try typing different keywords like "Happy", "Love", or "Thank".
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {suggestions.length === 0 && !personName && !phraseInput && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Enter a name, phrase, or both to see AI-powered suggestions. Either field works independently!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}