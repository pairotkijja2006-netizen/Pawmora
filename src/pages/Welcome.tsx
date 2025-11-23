import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-48 h-48 relative">
            <img
              src="/logo.png"
              alt="Pawmora Logo"
              className="w-full h-full object-contain"
            />
          </div>
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
