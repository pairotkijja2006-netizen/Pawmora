import { mockPets } from "@/data/mockPets";
import { useSavedPets } from "@/hooks/useSavedPets";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import PetDetailView from "@/components/PetDetailView";

const Saves = () => {
  const { savedPetIds } = useSavedPets();
  const navigate = useNavigate();
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

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
              Start pawing pets you love in the feed!
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
