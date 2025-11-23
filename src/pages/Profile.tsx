import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [animalPreference, setAnimalPreference] = useState<string[]>([]);
  const [homeType, setHomeType] = useState<string>("");
  const [otherPets, setOtherPets] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      loadPreferences();
    }
  }, [user, authLoading]);

  const loadPreferences = async () => {
    if (user) {
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
    }
    setLoading(false);
  };

  const toggleSelection = (
    value: string,
    currentState: string[],
    setter: (val: string[]) => void
  ) => {
    // Special handling for Animal Preference "Any" logic
    if (setter === setAnimalPreference) {
      if (value === "Any") {
        // If selecting Any, clear others. If deselecting Any, just remove it.
        if (currentState.includes("Any")) {
          setter([]);
        } else {
          setter(["Any"]);
        }
        return;
      } else {
        // If selecting specific animal, remove Any
        let newState = currentState.includes(value)
          ? currentState.filter((v) => v !== value)
          : [...currentState, value];

        if (newState.includes("Any")) {
          newState = newState.filter(v => v !== "Any");
        }
        setter(newState);
        return;
      }
    }

    if (currentState.includes(value)) {
      setter(currentState.filter((v) => v !== value));
    } else {
      setter([...currentState, value]);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          animal_preference: animalPreference,
          home_type: homeType,
          other_pets: otherPets,
          lifestyle: lifestyle,
        }, { onConflict: 'user_id' });

      if (error) throw error;
      toast.success("Preferences saved!");
      navigate("/feed");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleReset = async () => {
    setAnimalPreference([]);
    setHomeType("");
    setOtherPets([]);
    setLifestyle([]);

    if (user) {
      try {
        const { error } = await supabase
          .from("user_preferences")
          .upsert({
            user_id: user.id,
            animal_preference: [],
            home_type: "",
            other_pets: [],
            lifestyle: [],
          }, { onConflict: 'user_id' });

        if (error) throw error;
        toast.success("Preferences reset");
      } catch (error: any) {
        toast.error("Failed to reset preferences");
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/feed")}
            className="mr-4 text-[#FF4D6D] hover:text-[#FF3355] hover:bg-[#FF4D6D]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Profile & Preferences</h1>
        </div>

        {user && (
          <div className="mb-8 p-4 bg-card rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-medium">{user.email}</p>
          </div>
        )}

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
            Save Preferences
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full rounded-xl border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
            size="lg"
          >
            Reset to Default
          </Button>
          {user && (
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full"
              size="lg"
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
