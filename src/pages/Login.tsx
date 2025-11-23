import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/preferences');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-2xl font-bold text-foreground">PAWMORA</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/preferences')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/preferences')}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 pb-8">
        {/* Hero Section */}
        <div className="w-full max-w-lg lg:max-w-2xl mb-8 lg:mb-0 lg:mr-12">
          <div className="relative bg-primary rounded-3xl p-12 text-center shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="mb-6 inline-block p-4 bg-white/20 rounded-full">
                <span className="text-6xl">🐾</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                This app knows<br />your type.
              </h2>
              <p className="text-white/90 text-lg mb-2">🐾 PAWS EDITION 🐾</p>
              <div className="mt-8">
                <Button 
                  size="lg"
                  onClick={() => navigate('/preferences')}
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
                >
                  Let's get started! →
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm font-medium text-foreground">99% Accuracy</p>
            </div>
            <div>
              <div className="text-3xl mb-2">❤️</div>
              <p className="text-sm font-medium text-foreground">Pet Friendly</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm font-medium text-foreground">Profile Matching</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-2">Pawmora</h3>
              <p className="text-xl text-muted-foreground mb-1">Doomscroll, but it's all pets.</p>
              <p className="text-sm text-muted-foreground">Watch real adoptable pets and save the ones you love.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="rounded-xl"
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-xl" size="lg">
                Log in / Sign up
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/preferences')}
                className="text-muted-foreground hover:text-foreground"
              >
                Continue as guest
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            © 2024 Pawmora Inc. Made with ❤️ for pets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
