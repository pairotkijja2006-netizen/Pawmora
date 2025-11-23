import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, UserCircle, Cat } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Pawmora" className="h-16 w-auto" />
          <span className="font-black text-3xl tracking-tight text-[#FF4D6D]">PAWMORA</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-7xl mx-auto">
        {/* Hero Card */}
        <div className="w-full max-w-4xl bg-gradient-to-br from-[#FF8FA3] to-[#FF4D6D] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl mb-16">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 opacity-20 transform -rotate-12">
            <Cat className="w-12 h-12 text-white" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20 transform rotate-12">
            <Cat className="w-16 h-16 text-white" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Cat className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              This app knows<br />your type.
            </h1>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-medium tracking-wide">
              <Sparkles className="w-3 h-3" />
              PAWS EDITION
              <Sparkles className="w-3 h-3" />
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/preferences")}
              className="mt-4 bg-[#1A1F2C] hover:bg-black text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl transition-transform hover:scale-105"
            >
              Let's get started!
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl w-full text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF4D6D]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">99% Accuracy</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF4D6D]">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">Pet Friendly</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF4D6D]">
              <UserCircle className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-600">Profile Matching</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-muted-foreground">
        <p>© 2024 Pawmora Inc. Made with <Heart className="w-3 h-3 inline text-[#FF4D6D] mx-1" /> for pets.</p>
      </footer>
    </div>
  );
};

export default Welcome;
