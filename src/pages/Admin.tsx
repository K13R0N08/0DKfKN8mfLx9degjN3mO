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