-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user_preferences table
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  animal_preference TEXT[],
  home_type TEXT,
  other_pets TEXT[],
  lifestyle TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- User preferences policies
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Create paw_likes table (public, no auth required)
CREATE TABLE public.paw_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(pet_id, user_id),
  UNIQUE(pet_id, session_id)
);

-- Enable RLS on paw_likes
ALTER TABLE public.paw_likes ENABLE ROW LEVEL SECURITY;

-- Paw likes policies (anyone can read, anyone can insert)
CREATE POLICY "Anyone can view paw likes"
  ON public.paw_likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add paw likes"
  ON public.paw_likes FOR INSERT
  WITH CHECK (true);

-- Create saved_pets table (auth required)
CREATE TABLE public.saved_pets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pet_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, pet_id)
);

-- Enable RLS on saved_pets
ALTER TABLE public.saved_pets ENABLE ROW LEVEL SECURITY;

-- Saved pets policies
CREATE POLICY "Users can view their own saved pets"
  ON public.saved_pets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save pets"
  ON public.saved_pets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave pets"
  ON public.saved_pets FOR DELETE
  USING (auth.uid() = user_id);

-- Create comments table (auth required to post)
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Comments policies (anyone can read, only authenticated can post)
CREATE POLICY "Anyone can view comments"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can post comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_paw_likes_pet_id ON public.paw_likes(pet_id);
CREATE INDEX idx_saved_pets_user_id ON public.saved_pets(user_id);
CREATE INDEX idx_saved_pets_pet_id ON public.saved_pets(pet_id);
CREATE INDEX idx_comments_pet_id ON public.comments(pet_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();