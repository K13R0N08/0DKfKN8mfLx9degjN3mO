import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Phrase {
  id: string;
  text: string;
  category: "love" | "celebration" | "motivation" | "friendship";
  keywords: string[];
}

const initialPhrases: Phrase[] = [
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

const categoryColors = {
  love: "bg-red-100 text-red-700 border-red-200",
  celebration: "bg-yellow-100 text-yellow-700 border-yellow-200",
  motivation: "bg-blue-100 text-blue-700 border-blue-200",
  friendship: "bg-green-100 text-green-700 border-green-200",
};

export default function Admin() {
  const [phrases, setPhrases] = useState<Phrase[]>(initialPhrases);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: "",
    category: "love" as Phrase["category"],
    keywords: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim() || !formData.keywords.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const keywordsArray = formData.keywords.split(",").map(k => k.trim()).filter(k => k);
    
    if (isEditing) {
      setPhrases(prev => prev.map(phrase => 
        phrase.id === isEditing 
          ? { ...phrase, text: formData.text, category: formData.category, keywords: keywordsArray }
          : phrase
      ));
      toast({
        title: "Phrase Updated! ✅",
        description: `"${formData.text}" has been updated successfully.`,
      });
      setIsEditing(null);
    } else {
      const newPhrase: Phrase = {
        id: Date.now().toString(),
        text: formData.text,
        category: formData.category,
        keywords: keywordsArray,
      };
      setPhrases(prev => [...prev, newPhrase]);
      toast({
        title: "Phrase Added! ✅",
        description: `"${formData.text}" has been added to approved phrases.`,
      });
    }
    
    setFormData({ text: "", category: "love", keywords: "" });
  };

  const handleEdit = (phrase: Phrase) => {
    setFormData({
      text: phrase.text,
      category: phrase.category,
      keywords: phrase.keywords.join(", "),
    });
    setIsEditing(phrase.id);
  };

  const handleDelete = (id: string, text: string) => {
    setPhrases(prev => prev.filter(phrase => phrase.id !== id));
    toast({
      title: "Phrase Deleted",
      description: `"${text}" has been removed from approved phrases.`,
    });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setFormData({ text: "", category: "love", keywords: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-end mb-4">
          <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </Button>
            </Link>
        </div>
        <div className="flex items-center justify-between md:flex-row flex-col-reverse mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Moderation Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage pre-approved phrases for AI-powered content moderation
            </p>
          </div>
          <div className="justify-end">
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                {isEditing ? "Edit Phrase" : "Add New Phrase"}
              </CardTitle>
              <CardDescription>
                {isEditing ? "Update the selected phrase" : "Add a new approved phrase to the collection"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="text" className="text-sm font-medium mb-2 block">
                    Phrase Text
                  </label>
                  <Input
                    id="text"
                    placeholder="e.g., Happy Birthday!"
                    value={formData.text}
                    onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="category" className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: Phrase["category"]) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="love">Love</SelectItem>
                      <SelectItem value="celebration">Celebration</SelectItem>
                      <SelectItem value="motivation">Motivation</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="keywords" className="text-sm font-medium mb-2 block">
                    Keywords (comma-separated)
                  </label>
                  <Textarea
                    id="keywords"
                    placeholder="e.g., birthday, happy, celebration, party"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-gradient-primary">
                    {isEditing ? "Update Phrase" : "Add Phrase"}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Phrases List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Approved Phrases ({phrases.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {phrases.map((phrase) => (
                <Card key={phrase.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{phrase.text}</span>
                          <Badge className={categoryColors[phrase.category]}>
                            {phrase.category}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {phrase.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(phrase)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(phrase.id, phrase.text)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}