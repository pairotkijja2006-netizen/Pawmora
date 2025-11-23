import { useState, useEffect } from "react";
import { mockPets } from "@/data/mockPets";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bookmark, ChevronDown, ChevronUp, User, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<"save" | "comment">("save");
  const [sessionId] = useState(() => crypto.randomUUID());

  const [pawLikes, setPawLikes] = useState<Record<string, number>>({});
  const [userPawLiked, setUserPawLiked] = useState<Record<string, boolean>>({});
  const [savedPets, setSavedPets] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showPawAnimation, setShowPawAnimation] = useState(false);

  const currentPet = mockPets[currentIndex];

  useEffect(() => {
    loadPawLikes();
    loadSavedPets();
    loadComments();
  }, [currentPet.id, user]);

  const loadPawLikes = async () => {
    const { data, count } = await supabase
      .from("paw_likes")
      .select("*", { count: "exact" })
      .eq("pet_id", currentPet.id);

    setPawLikes({ ...pawLikes, [currentPet.id]: count || 0 });

    if (user) {
      const userLiked = data?.some((like) => like.user_id === user.id);
      setUserPawLiked({ ...userPawLiked, [currentPet.id]: userLiked || false });
    } else {
      const sessionLiked = data?.some((like) => like.session_id === sessionId);
      setUserPawLiked({ ...userPawLiked, [currentPet.id]: sessionLiked || false });
    }
  };

  const loadSavedPets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_pets")
      .select("pet_id")
      .eq("user_id", user.id);

    if (data) {
      setSavedPets(new Set(data.map((s) => s.pet_id)));
    }
  };

  const loadComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*, profiles(email)")
      .eq("pet_id", currentPet.id)
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  const handleNext = () => {
    if (currentIndex < mockPets.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(mockPets.length - 1);
    }
  };

  const handlePawLike = async () => {
    const alreadyLiked = userPawLiked[currentPet.id];

    if (!alreadyLiked) {
      const { error } = await supabase.from("paw_likes").insert({
        pet_id: currentPet.id,
        user_id: user?.id || null,
        session_id: user ? null : sessionId,
      });

      if (!error) {
        setPawLikes({ ...pawLikes, [currentPet.id]: (pawLikes[currentPet.id] || 0) + 1 });
        setUserPawLiked({ ...userPawLiked, [currentPet.id]: true });
        setShowPawAnimation(true);
        setTimeout(() => setShowPawAnimation(false), 500);
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      setAuthAction("save");
      setShowAuthModal(true);
      return;
    }

    const isSaved = savedPets.has(currentPet.id);

    if (isSaved) {
      await supabase
        .from("saved_pets")
        .delete()
        .eq("user_id", user.id)
        .eq("pet_id", currentPet.id);

      const newSaved = new Set(savedPets);
      newSaved.delete(currentPet.id);
      setSavedPets(newSaved);
      toast.success("Removed from saved pets");
    } else {
      await supabase.from("saved_pets").insert({
        user_id: user.id,
        pet_id: currentPet.id,
      });

      setSavedPets(new Set([...savedPets, currentPet.id]));
      toast.success("Pet saved!");
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      setAuthAction("comment");
      setShowAuthModal(true);
      return;
    }

    if (!commentText.trim()) return;

    const { error } = await supabase.from("comments").insert({
      pet_id: currentPet.id,
      user_id: user.id,
      comment_text: commentText,
    });

    if (!error) {
      setCommentText("");
      loadComments();
      toast.success("Comment posted!");
    } else {
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-card border-b border-border z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-xl font-bold text-foreground">Pawmora</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/saves")}
          >
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
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
            {/* Paw Like Button */}
            <div className="flex flex-col items-center gap-1">
              <Button
                size="icon"
                onClick={handlePawLike}
                disabled={userPawLiked[currentPet.id]}
                className={`h-14 w-14 rounded-full shadow-lg transition-all ${userPawLiked[currentPet.id]
                    ? "bg-primary hover:bg-primary scale-110"
                    : "bg-white/90 hover:bg-white text-primary"
                  }`}
              >
                <span className="text-2xl">🐾</span>
              </Button>
              <span className="text-white text-sm font-bold bg-black/50 px-2 py-1 rounded-full">
                {pawLikes[currentPet.id] || 0}
              </span>
            </div>

            {/* Save Button */}
            <Button
              size="icon"
              onClick={handleSave}
              className={`h-14 w-14 rounded-full shadow-lg transition-all ${savedPets.has(currentPet.id)
                  ? "bg-primary hover:bg-primary-hover scale-110"
                  : "bg-white/90 hover:bg-white text-primary"
                }`}
            >
              <Bookmark className={`h-6 w-6 ${savedPets.has(currentPet.id) ? "fill-current" : ""}`} />
            </Button>

            {/* Comment Button */}
            <Button
              size="icon"
              onClick={() => {
                if (!user) {
                  setAuthAction("comment");
                  setShowAuthModal(true);
                } else {
                  setShowComments(!showComments);
                }
              }}
              className="h-14 w-14 rounded-full shadow-lg bg-white/90 hover:bg-white text-primary"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>

          {/* Paw Animation */}
          {showPawAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-9xl animate-scale-in">🐾</span>
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={handlePrevious}
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
              className="rounded-full shadow-lg bg-white/90 hover:bg-white disabled:opacity-30"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {user && showComments && (
        <div className="p-4 bg-card border-t border-border max-h-48 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommentSubmit();
                }}
              />
              <Button onClick={handleCommentSubmit} size="sm">
                Post
              </Button>
            </div>
            {comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-medium">{comment.profiles?.email?.split("@")[0]}: </span>
                <span className="text-muted-foreground">{comment.comment_text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onSuccess={() => {
          if (authAction === "save") {
            handleSave();
          } else if (authAction === "comment") {
            setShowComments(true);
          }
        }}
      />
    </div>
  );
};

export default VideoFeed;
