-- Create threads_users table for simple authentication
CREATE TABLE public.threads_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.threads_users ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles
CREATE POLICY "Anyone can view usernames"
  ON public.threads_users
  FOR SELECT
  USING (true);

-- Users can only update their own data
CREATE POLICY "Users can update own profile"
  ON public.threads_users
  FOR UPDATE
  USING (id = auth.uid());

-- Create threads_communities table to map objectives to communities
CREATE TABLE public.threads_communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  objective_id TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.threads_communities ENABLE ROW LEVEL SECURITY;

-- Anyone can view communities
CREATE POLICY "Anyone can view communities"
  ON public.threads_communities
  FOR SELECT
  USING (true);

-- Create threads_posts table
CREATE TABLE public.threads_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.threads_communities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.threads_users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.threads_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can view posts
CREATE POLICY "Anyone can view posts"
  ON public.threads_posts
  FOR SELECT
  USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON public.threads_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
  ON public.threads_posts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
  ON public.threads_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create threads_comments table
CREATE TABLE public.threads_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.threads_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.threads_users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.threads_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view comments
CREATE POLICY "Anyone can view comments"
  ON public.threads_comments
  FOR SELECT
  USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
  ON public.threads_comments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON public.threads_comments
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON public.threads_comments
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create threads_post_likes table for likes/dislikes on posts
CREATE TABLE public.threads_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.threads_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.threads_users(id) ON DELETE CASCADE NOT NULL,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(post_id, user_id)
);

ALTER TABLE public.threads_post_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can view likes
CREATE POLICY "Anyone can view post likes"
  ON public.threads_post_likes
  FOR SELECT
  USING (true);

-- Authenticated users can create likes
CREATE POLICY "Authenticated users can like posts"
  ON public.threads_post_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own likes
CREATE POLICY "Users can update own post likes"
  ON public.threads_post_likes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete own post likes"
  ON public.threads_post_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create threads_comment_likes table for likes/dislikes on comments
CREATE TABLE public.threads_comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES public.threads_comments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.threads_users(id) ON DELETE CASCADE NOT NULL,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(comment_id, user_id)
);

ALTER TABLE public.threads_comment_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can view comment likes
CREATE POLICY "Anyone can view comment likes"
  ON public.threads_comment_likes
  FOR SELECT
  USING (true);

-- Authenticated users can like comments
CREATE POLICY "Authenticated users can like comments"
  ON public.threads_comment_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comment likes
CREATE POLICY "Users can update own comment likes"
  ON public.threads_comment_likes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own comment likes
CREATE POLICY "Users can delete own comment likes"
  ON public.threads_comment_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_threads_posts_updated_at
  BEFORE UPDATE ON public.threads_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threads_comments_updated_at
  BEFORE UPDATE ON public.threads_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();