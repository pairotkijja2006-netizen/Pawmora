import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type PreferenceOption = {
  label: string;
  value: string;
};

const Preferences = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animalPreference, setAnimalPreference] = useState<string[]>([]);
  const [homeType, setHomeType] = useState<string>("");
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setAnimalPreference(data.animal_preference || []);
      setHomeType(data.home_type || "");
      setOtherPets(data.other_pets || []);
      setLifestyle(data.lifestyle || []);
    }
  };

  const toggleSelection = (
    value: string,
    currentState: string[],
    setter: (val: string[]) => void
  ) => {
    if (currentState.includes(value)) {
      setter(currentState.filter((v) => v !== value));
    } else {
      setter([...currentState, value]);
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from("user_preferences")
          .upsert({
            user_id: user.id,
            animal_preference: animalPreference,
            home_type: homeType,
            other_pets: otherPets,
            lifestyle: lifestyle,
          });

        if (error) throw error;
        toast.success("Preferences saved!");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    navigate("/feed");
  };

  const handleSkip = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tell us what to show you
          </h1>
          <p className="text-muted-foreground">
            We'll use this to personalize your feed. You can skip this and just
            start scrolling.
          </p>
        </div>

        {/* Preferences Form */}
        <div className="space-y-8">
          {/* Animal Preference */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Which animals do you want to see?
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Dogs", "Cats", "Any"].map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className={`cursor-pointer px-4 py-2 text-base rounded-full transition-colors ${animalPreference.includes(option)
                      ? "bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF3355]"
                      : "border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
                    }`}
                  onClick={() =>
                    toggleSelection(option, animalPreference, setAnimalPreference)
                  }
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          {/* Home Type */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Where do you live?
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Condo / Apartment",
                "House",
                "Shared place",
                "Other",
              ].map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className={`cursor-pointer px-4 py-2 text-base rounded-full transition-colors ${homeType === option
                      ? "bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF3355]"
                      : "border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
                    }`}
                  onClick={() => setHomeType(option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          {/* Other Pets */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Do you already have pets?
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "No other pets",
                "I have dogs",
                "I have cats",
                "I have other animals",
              ].map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className={`cursor-pointer px-4 py-2 text-base rounded-full transition-colors ${otherPets.includes(option)
                      ? "bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF3355]"
                      : "border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
                    }`}
                  onClick={() =>
                    toggleSelection(option, otherPets, setOtherPets)
                  }
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              What describes you?
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Outdoor person",
                "Homebody",
                "Very tidy",
                "Kids in the home",
                "Flexible / relaxed",
              ].map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className={`cursor-pointer px-4 py-2 text-base rounded-full transition-colors ${lifestyle.includes(option)
                      ? "bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF3355]"
                      : "border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
                    }`}
                  onClick={() =>
                    toggleSelection(option, lifestyle, setLifestyle)
                  }
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-12 space-y-3">
          <Button
            onClick={handleSave}
            className="w-full rounded-xl bg-[#FF4D6D] hover:bg-[#FF3355] text-white"
            size="lg"
          >
            Save and start scrolling
          </Button>
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full"
            size="lg"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
