import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload as UploadIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { AuthModal } from "@/components/AuthModal";

const Upload = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(!user);

    const [petName, setPetName] = useState("");
    const [age, setAge] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [location, setLocation] = useState("");
    const [shelter, setShelter] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const availableTags = [
        "Playful",
        "Friendly",
        "Good with kids",
        "Good with pets",
        "House trained",
        "High energy",
        "Calm",
        "Needs training",
    ];

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        // Validate required fields
        if (!petName || !age || !species || !breed || !location || !shelter || !description) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!videoFile) {
            toast.error("Please select a video file");
            return;
        }

        // In a real app, this would upload to storage and save to database
        toast.success(
            `Pet profile for ${petName} submitted! In a full app, this would be uploaded to the database.`
        );

        // Reset form
        setPetName("");
        setAge("");
        setSpecies("");
        setBreed("");
        setLocation("");
        setShelter("");
        setDescription("");
        setSelectedTags([]);
        setVideoFile(null);
    };

    if (!user) {
        return (
            <>
                <div className="min-h-screen bg-[#FFF9F5] flex flex-col items-center justify-center p-6">
                    <div className="text-center space-y-4 max-w-md">
                        <h2 className="text-2xl font-bold">Sign in to upload</h2>
                        <p className="text-muted-foreground">
                            You need to be signed in to upload pet videos
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setShowAuthModal(true)} className="bg-[#FF4D6D] hover:bg-[#FF3355]">
                                Sign In
                            </Button>
                            <Button variant="outline" onClick={() => navigate("/feed")} className="border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white">
                                Back to Feed
                            </Button>
                        </div>
                    </div>
                </div>
                <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onSuccess={() => window.location.reload()} />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF9F5] p-6">
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
                    <h1 className="text-3xl font-bold text-foreground">Upload Pet Profile</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Pet Name */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Pet Name *
                        </label>
                        <Input
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            placeholder="e.g., Max"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Age (years) *
                        </label>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g., 3"
                            required
                        />
                    </div>

                    {/* Species */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Species *
                        </label>
                        <Input
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            placeholder="e.g., Dog, Cat"
                            required
                        />
                    </div>

                    {/* Breed */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Breed *
                        </label>
                        <Input
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            placeholder="e.g., Golden Retriever"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Location *
                        </label>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g., Los Angeles, CA"
                            required
                        />
                    </div>

                    {/* Shelter */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Shelter Name *
                        </label>
                        <Input
                            value={shelter}
                            onChange={(e) => setShelter(e.target.value)}
                            placeholder="e.g., Happy Paws Shelter"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Description *
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about this pet..."
                            className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className={`cursor-pointer px-4 py-2 text-base rounded-full transition-colors ${selectedTags.includes(tag)
                                            ? "bg-[#FF4D6D] text-white border-[#FF4D6D] hover:bg-[#FF3355]"
                                            : "border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white"
                                        }`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Video Upload */}
                    <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">
                            Video *
                        </label>
                        <div className="border-2 border-dashed border-[#FF4D6D] rounded-lg p-8 text-center">
                            <UploadIcon className="mx-auto h-12 w-12 text-[#FF4D6D] mb-4" />
                            <Input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                className="max-w-xs mx-auto"
                            />
                            {videoFile && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Selected: {videoFile.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-[#FF4D6D] hover:bg-[#FF3355] text-white py-6 text-lg"
                        size="lg"
                    >
                        Submit Pet Profile
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
