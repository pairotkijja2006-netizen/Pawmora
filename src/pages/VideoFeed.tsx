import { useState } from "react";
import { mockPets } from "@/data/mockPets";
import { useSavedPets } from "@/hooks/useSavedPets";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Bookmark, ChevronDown, ChevronUp } from "lucide-react";

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toggleSave, isSaved } = useSavedPets();
  const navigate = useNavigate();

  const currentPet = mockPets[currentIndex];
  const petIsSaved = isSaved(currentPet.id);

  const handleNext = () => {
    if (currentIndex < mockPets.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePaw = () => {
    toggleSave(currentPet.id);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-card border-b border-border z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-xl font-bold text-foreground">Pawmora</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/saves")}
          className="relative"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </header>

      {/* Video Container */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Video */}
        <div className="relative w-full h-full max-w-2xl">
          <video
            key={currentPet.videoUrl}
            className="w-full h-full object-cover rounded-none md:rounded-2xl"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={currentPet.videoUrl} type="video/mp4" />
          </video>

          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h2 className="text-3xl font-bold mb-1">{currentPet.petName}</h2>
            <p className="text-lg opacity-90">
              {currentPet.age} years • {currentPet.species}
            </p>
            <p className="text-sm opacity-75 mt-1">{currentPet.location}</p>
            <p className="text-sm italic opacity-90 mt-2">
              {currentPet.shortLabel}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-4">
            <Button
              size="icon"
              onClick={handlePaw}
              className={`h-14 w-14 rounded-full shadow-lg transition-all ${
                petIsSaved
                  ? "bg-primary hover:bg-primary-hover scale-110"
                  : "bg-white/90 hover:bg-white text-primary"
              }`}
            >
              <Heart className={`h-6 w-6 ${petIsSaved ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded-full shadow-lg bg-white/90 hover:bg-white disabled:opacity-30"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === mockPets.length - 1}
              className="rounded-full shadow-lg bg-white/90 hover:bg-white disabled:opacity-30"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="p-2 text-center text-sm text-muted-foreground">
        {currentIndex + 1} / {mockPets.length}
      </div>
    </div>
  );
};

export default VideoFeed;
