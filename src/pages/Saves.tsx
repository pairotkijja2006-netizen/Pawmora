import { mockPets } from "@/data/mockPets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PetDetailView from "@/components/PetDetailView";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

const Saves = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [savedPetIds, setSavedPetIds] = useState<string[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadSavedPets();
    }
  }, [user]);

  const loadSavedPets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_pets")
      .select("pet_id")
      .eq("user_id", user.id);

    if (data) {
      setSavedPetIds(data.map((s) => s.pet_id));
    }
  };

  const savedPets = mockPets.filter((pet) => savedPetIds.includes(pet.id));

  const selectedPet = selectedPetId
    ? mockPets.find((pet) => pet.id === selectedPetId)
    : null;

  if (selectedPet) {
    return (
      <PetDetailView
        pet={selectedPet}
        onClose={() => setSelectedPetId(null)}
      />
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Sign in to view saved pets</h2>
            <p className="text-muted-foreground">
              You need to be signed in to save and view pets
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
              <Button variant="outline" onClick={() => navigate("/feed")}>
                Back to Feed
              </Button>
            </div>
          </div>
        </div>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Saved pets</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {savedPets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No saved pets yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start saving pets you love in the feed!
            </p>
            <Button onClick={() => navigate("/feed")}>
              Go to feed
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => setSelectedPetId(pet.id)}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={pet.thumbnailUrl}
                    alt={pet.petName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {pet.petName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pet.age} years • {pet.species}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {pet.location}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    Tap for more info →
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saves;
