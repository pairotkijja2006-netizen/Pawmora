import { Pet } from "@/data/mockPets";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PetDetailViewProps {
  pet: Pet;
  onClose: () => void;
}

const PetDetailView = ({ pet, onClose }: PetDetailViewProps) => {
  const handleAdopt = () => {
    alert(
      "In a full app, this would send your interest to the shelter.\n\n" +
      `You'd be contacting ${pet.shelter} about ${pet.petName}!`
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{pet.petName}</h1>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 pb-24">
        {/* Video/Image */}
        <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-muted">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={pet.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Basic Info */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {pet.petName}
          </h2>
          <p className="text-lg text-muted-foreground mb-1">
            {pet.age} years • {pet.species} • {pet.breed}
          </p>
          <p className="text-muted-foreground">{pet.location}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {pet.shelter}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {pet.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-3">
            About {pet.petName}
          </h3>
          <p className="text-foreground leading-relaxed">{pet.description}</p>
        </div>

        {/* Adoption CTA */}
        <div className="bg-[#FF4D6D]/10 rounded-2xl p-6 border border-[#FF4D6D]/20">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Ready to adopt?
          </h3>
          <p className="text-muted-foreground mb-4">
            Contact {pet.shelter} to learn more about {pet.petName} and start
            the adoption process.
          </p>
          <Button onClick={handleAdopt} size="lg" className="w-full bg-[#FF4D6D] hover:bg-[#FF3355] text-white">
            I want to adopt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailView;
