import { useState, useMemo } from "react";
import Original from "./img/Original.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Gift, Star, Settings, ReceiptText } from "lucide-react";
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
  { id: "12", text: "Forever Yours", category: "love", keywords: ["forever", "yours", "romantic", "eternal"] },
  { id: "13", text: "True Friend", category: "friendship", keywords: ["friend", "true", "loyal", "bond"] },
  { id: "14", text: "Cheers to You!", category: "celebration", keywords: ["cheers", "celebration", "toast", "party"] },
  { id: "15", text: "Keep Going", category: "motivation", keywords: ["perseverance", "go", "motivation", "drive"] },
  { id: "16", text: "My Valentine", category: "love", keywords: ["valentine", "love", "romantic", "heart"] },
  { id: "17", text: "Always There", category: "friendship", keywords: ["friend", "always", "support", "loyalty"] },
  { id: "18", text: "Well Done!", category: "celebration", keywords: ["success", "achievement", "accomplishment", "done"] },
  { id: "19", text: "Dream Big", category: "motivation", keywords: ["dream", "ambition", "big", "goals"] },
  { id: "20", text: "Hugs & Kisses", category: "love", keywords: ["hugs", "kisses", "affection", "romantic"] },
  { id: "21", text: "Bestie for Life", category: "friendship", keywords: ["bestie", "friend", "forever", "pal"] },
  { id: "22", text: "Happy Anniversary", category: "celebration", keywords: ["anniversary", "happy", "love", "celebration"] },
  { id: "23", text: "Shine Bright", category: "motivation", keywords: ["shine", "bright", "light", "inspiration"] },
  { id: "24", text: "Be Mine", category: "love", keywords: ["valentine", "love", "romantic", "affection"] },
  { id: "25", text: "You Got This", category: "motivation", keywords: ["confidence", "strength", "belief", "power"] },
  { id: "26", text: "So Proud of You", category: "celebration", keywords: ["proud", "achievement", "success", "celebration"] },
  { id: "27", text: "Forever Friends", category: "friendship", keywords: ["friends", "forever", "bond", "trust"] },
  { id: "28", text: "Lots of Love", category: "love", keywords: ["love", "affection", "heart", "caring"] },
  { id: "29", text: "High Five!", category: "celebration", keywords: ["celebrate", "victory", "win", "fun"] },
  { id: "30", text: "Never Give Up", category: "motivation", keywords: ["never", "give up", "strength", "determination"] },
  { id: "31", text: "My Sunshine", category: "love", keywords: ["sunshine", "love", "warmth", "romantic"] },
  { id: "32", text: "Ride or Die", category: "friendship", keywords: ["friend", "loyal", "bond", "trust"] },
  { id: "33", text: "Time to Celebrate!", category: "celebration", keywords: ["celebrate", "party", "fun", "joy"] },
  { id: "34", text: "Believe in Yourself", category: "motivation", keywords: ["believe", "self", "confidence", "inspiration"] },
  { id: "35", text: "Love Always", category: "love", keywords: ["love", "always", "romantic", "forever"] },
  { id: "36", text: "Partner in Crime", category: "friendship", keywords: ["friend", "partner", "fun", "bond"] },
  { id: "37", text: "Best Wishes", category: "celebration", keywords: ["wishes", "celebration", "congrats", "happy"] },
  { id: "38", text: "Stay Positive", category: "motivation", keywords: ["positive", "optimism", "motivation", "good vibes"] },
  { id: "39", text: "Love & Light", category: "love", keywords: ["love", "light", "affection", "warmth"] },
  { id: "40", text: "Friends Forever", category: "friendship", keywords: ["friends", "forever", "bond", "loyalty"] },
  { id: "41", text: "You Did It!", category: "celebration", keywords: ["achievement", "success", "congratulations", "done"] },
  { id: "42", text: "Chase Your Dreams", category: "motivation", keywords: ["dreams", "chase", "ambition", "goals"] },
  { id: "43", text: "Soulmate", category: "love", keywords: ["soulmate", "love", "romantic", "forever"] },
  { id: "44", text: "My Buddy", category: "friendship", keywords: ["buddy", "pal", "friend", "mate"] },
  { id: "45", text: "Hip Hip Hooray!", category: "celebration", keywords: ["hooray", "celebration", "party", "cheer"] },
  { id: "46", text: "Stay Focused", category: "motivation", keywords: ["focus", "determination", "goals", "discipline"] },
  { id: "47", text: "With All My Heart", category: "love", keywords: ["heart", "romantic", "love", "devotion"] },
  { id: "48", text: "No Matter What", category: "friendship", keywords: ["friendship", "loyalty", "always", "support"] },
  { id: "49", text: "Way to Go!", category: "celebration", keywords: ["celebration", "achievement", "success", "praise"] },
  { id: "50", text: "Keep Shining", category: "motivation", keywords: ["shine", "light", "bright", "motivation"] },
  { id: "51", text: "Crazy in Love", category: "love", keywords: ["love", "crazy", "romantic", "passion"] },
  { id: "52", text: "Forever Bonded", category: "friendship", keywords: ["bond", "forever", "friendship", "trust"] },
  { id: "53", text: "Bravo!", category: "celebration", keywords: ["bravo", "success", "celebration", "praise"] },
  { id: "54", text: "Rise & Grind", category: "motivation", keywords: ["rise", "grind", "work", "hustle"] },
  { id: "55", text: "You’re My World", category: "love", keywords: ["world", "love", "romantic", "forever"] },
  { id: "56", text: "Best Pal", category: "friendship", keywords: ["pal", "friend", "best", "buddy"] },
  { id: "57", text: "Big Cheers!", category: "celebration", keywords: ["cheers", "celebration", "party", "toast"] },
  { id: "58", text: "Stay Brave", category: "motivation", keywords: ["brave", "courage", "strength", "motivation"] },
  { id: "59", text: "All My Love", category: "love", keywords: ["love", "romantic", "heart", "devotion"] },
  { id: "60", text: "Forever Sidekick", category: "friendship", keywords: ["sidekick", "friend", "loyal", "fun"] },
  { id: "61", text: "Endless Love", category: "love", keywords: ["love", "endless", "eternal", "romantic"] },
  { id: "62", text: "True Companion", category: "friendship", keywords: ["companion", "friend", "true", "bond"] },
  { id: "63", text: "Let’s Party!", category: "celebration", keywords: ["party", "celebration", "fun", "joy"] },
  { id: "64", text: "Never Quit", category: "motivation", keywords: ["quit", "never", "perseverance", "strength"] },
  { id: "65", text: "My Darling", category: "love", keywords: ["darling", "love", "romantic", "affection"] },
  { id: "66", text: "Trust You Always", category: "friendship", keywords: ["trust", "friend", "always", "bond"] },
  { id: "67", text: "Celebrate Big", category: "celebration", keywords: ["celebration", "big", "party", "joy"] },
  { id: "68", text: "Stay Determined", category: "motivation", keywords: ["determination", "stay", "strong", "goals"] },
  { id: "69", text: "Be My Love", category: "love", keywords: ["be mine", "love", "romantic", "heart"] },
  { id: "70", text: "Side by Side", category: "friendship", keywords: ["side", "friend", "bond", "together"] },
  { id: "71", text: "Hats Off!", category: "celebration", keywords: ["hats off", "congrats", "success", "cheer"] },
  { id: "72", text: "Stay Fearless", category: "motivation", keywords: ["fearless", "brave", "courage", "power"] },
  { id: "73", text: "Kisses for You", category: "love", keywords: ["kisses", "love", "affection", "romantic"] },
  { id: "74", text: "Bro for Life", category: "friendship", keywords: ["bro", "life", "friend", "pal"] },
  { id: "75", text: "Celebrate Today", category: "celebration", keywords: ["celebrate", "today", "joy", "fun"] },
  { id: "76", text: "Push Forward", category: "motivation", keywords: ["push", "forward", "drive", "motivation"] },
  { id: "77", text: "My Treasure", category: "love", keywords: ["treasure", "love", "romantic", "dear"] },
  { id: "78", text: "Sisterhood", category: "friendship", keywords: ["sisterhood", "bond", "friend", "loyalty"] },
  { id: "79", text: "So Excited!", category: "celebration", keywords: ["excited", "celebration", "fun", "party"] },
  { id: "80", text: "Be Bold", category: "motivation", keywords: ["bold", "courage", "strength", "confidence"] },
  { id: "81", text: "My Heartbeat", category: "love", keywords: ["heartbeat", "love", "romantic", "affection"] },
  { id: "82", text: "Best Mate", category: "friendship", keywords: ["mate", "friend", "pal", "loyal"] },
  { id: "83", text: "Clap for You", category: "celebration", keywords: ["clap", "applause", "congrats", "success"] },
  { id: "84", text: "Dare to Dream", category: "motivation", keywords: ["dream", "dare", "ambition", "goals"] },
  { id: "85", text: "Sweetheart", category: "love", keywords: ["sweetheart", "love", "romantic", "dear"] },
  { id: "86", text: "Homie", category: "friendship", keywords: ["homie", "friend", "pal", "crew"] },
  { id: "87", text: "Fireworks Time", category: "celebration", keywords: ["fireworks", "celebration", "party", "festive"] },
  { id: "88", text: "Make It Happen", category: "motivation", keywords: ["make it happen", "drive", "success", "determination"] },
  { id: "89", text: "My Angel", category: "love", keywords: ["angel", "love", "romantic", "affection"] },
  { id: "90", text: "Forever Crew", category: "friendship", keywords: ["crew", "forever", "friends", "bond"] },
  { id: "91", text: "Cheers All Around", category: "celebration", keywords: ["cheers", "celebration", "party", "fun"] },
  { id: "92", text: "Work Hard", category: "motivation", keywords: ["work", "hard", "effort", "drive"] },
  { id: "93", text: "My One & Only", category: "love", keywords: ["one and only", "love", "romantic", "forever"] },
  { id: "94", text: "True Sister", category: "friendship", keywords: ["sister", "friend", "bond", "loyal"] },
  { id: "95", text: "Celebrate Love", category: "celebration", keywords: ["celebration", "love", "happy", "party"] },
  { id: "96", text: "Stay Hungry", category: "motivation", keywords: ["hungry", "drive", "ambition", "success"] },
  { id: "97", text: "Sweetie Pie", category: "love", keywords: ["sweetie", "love", "pie", "affection"] },
  { id: "98", text: "Brothers Forever", category: "friendship", keywords: ["brothers", "forever", "friendship", "bond"] },
  { id: "99", text: "Raise a Glass", category: "celebration", keywords: ["toast", "celebration", "cheers", "party"] },
  { id: "100", text: "You Can Do It!", category: "motivation", keywords: ["can do", "motivation", "confidence", "strength"] },
  { id: "101", text: "Passenger Princess", category: "love", keywords: ["partner", "princess", "drive", "car"] },
  { id: "102", text: "Passenger Prince", category: "love", keywords: ["partner", "prince", "drive", "car"] },
];

const categoryIcons = {
  love: Heart,
  celebration: Gift,
  motivation: Star,
  friendship: Sparkles,
};

const orderBasket = [
  {

  }
]

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
  const [orderBasket, setOrderBasket] = useState<{ text: string; url: string }[]>([]);
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

    return suggestions.slice(0, 15); // Limit to 6 suggestions
  }, [personName, phraseInput]);

   const addOrder = (text: string, url: string) => {
    if (selectedSuggestion !== null) {
    setOrderBasket((prev) => [
      ...prev,
      { text, url }
    ])
  }
  }

    const sumbitOrder = () => {
    toast({
      title: "Order sent! 🖨",
      description: `Your custom can order has been sent to print!`,
    });
    setOrderBasket([])
    return;
  }

  const handleOrderSubmit = () => {
    if (!selectedSuggestion && !personName.trim() && !phraseInput.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a name, phrase, or select a suggestion to continue.",
        variant: "destructive"
      });
      return;
    } else if (selectedSuggestion === null ){
       toast({
        title: "Missing Information",
        description: "Please select a suggestion before adding to order",
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
    addOrder(selectedSuggestion, Original)
    console.log(orderBasket)
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
    <div className="min-h-screen bg-[#EEEEEE]">
      <div className="container mx-auto px-4 py-8 max-w-6xl ">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="flex justify-end gap-4 mb-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" className="gap-2 relative">
                  <ReceiptText className="h-4 w-4" />
                  Print Queue
                  {orderBasket.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-2">
                    {orderBasket.length}
                    </span>
                  )}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="grid gap-3">
                  {orderBasket.length === 0 ? (
                    <Card>
                      <CardContent className="p-4 text-center text-muted-foreground">
                        Nothing in print queue!
                      </CardContent>
                    </Card>
                  ) : (
                    orderBasket.map((orders, index) => (
                      <Card key={index} className="space-y-2">
                        <CardContent className="p-2">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{orders.text}</span>
                            <img className="w-10" src={orders.url} alt="" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                  {orderBasket.length > 0 && (
                  <Button 
                  className="bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => sumbitOrder()}
                  >
                    <ReceiptText className="h-4 w-4" />
                    Print
                  </Button>
                )}
                </div>
              </HoverCardContent>
            </HoverCard>
            <Link to="/admin">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text mb-4">
            Coca-Cola Moderation AI Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered content moderation for personalized Coca-Cola cans. 
            Enter customer details and our system suggests pre-approved, brand-safe phrases!
          </p>
        </div>

        <div className="grid lg:grid-rows-2 gap-8">
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
                  <div className="p-4 bg-gradient-hero rounded-8xl border">
                    <h3 className="font-semibold mb-2">Selected Suggestion:</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {selectedSuggestion}
                      </Badge>
                    </div>
                  </div>
                )}
                <div></div>
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
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">
              {suggestions.length > 0 ? "AI Suggestions" : "Enter name or phrase to see suggestions"}
            </h2>
           <div
  className={
    suggestions.length > 0
      ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
      : "grid-cols-1"
  }
>
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