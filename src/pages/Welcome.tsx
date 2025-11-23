import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="space-y-4">
          <div className="inline-block p-6 bg-primary/10 rounded-full">
            <span className="text-7xl">🐾</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground">Pawmora</h1>
          <p className="text-xl text-muted-foreground">
            Doomscroll, but it's all pets.
          </p>
        </div>

        {/* Get Started Button */}
        <Button
          size="lg"
          onClick={() => navigate("/preferences")}
          className="w-full rounded-full text-lg py-6"
        >
          Get Started
        </Button>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground">
          Watch real adoptable pets and save the ones you love
        </p>
      </div>
    </div>
  );
};

export default Welcome;
