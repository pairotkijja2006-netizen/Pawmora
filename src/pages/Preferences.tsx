import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type PreferenceOption = {
  label: string;
  value: string;
};

const Preferences = () => {
  const navigate = useNavigate();
  const [animalPreference, setAnimalPreference] = useState<string[]>([]);
  const [homeType, setHomeType] = useState<string>("");
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);

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

  const handleSave = () => {
    const preferences = {
      animalPreference,
      homeType,
      otherPets,
      lifestyle,
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    navigate("/feed");
  };

  const handleSkip = () => {
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-background p-6">
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
                  variant={
                    animalPreference.includes(option) ? "default" : "outline"
                  }
                  className="cursor-pointer px-4 py-2 text-base rounded-full"
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
                  variant={homeType === option ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-base rounded-full"
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
                  variant={otherPets.includes(option) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-base rounded-full"
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
                  variant={lifestyle.includes(option) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-base rounded-full"
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
            className="w-full rounded-xl"
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
