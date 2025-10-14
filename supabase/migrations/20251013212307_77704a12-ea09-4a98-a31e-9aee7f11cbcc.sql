-- Create past papers table
CREATE TABLE public.past_papers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year integer NOT NULL,
  season text NOT NULL CHECK (season IN ('june', 'november')),
  pdf_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(year, season)
);

-- Create past paper objectives table
CREATE TABLE public.past_paper_objectives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  past_paper_id uuid NOT NULL REFERENCES public.past_papers(id) ON DELETE CASCADE,
  text text NOT NULL,
  objective_number integer NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create marks log table
CREATE TABLE public.marks_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  past_paper_id uuid NOT NULL REFERENCES public.past_papers(id) ON DELETE CASCADE,
  marks integer NOT NULL CHECK (marks >= 0 AND marks <= 90),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create difficulty polls table
CREATE TABLE public.paper_difficulty_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  past_paper_id uuid NOT NULL REFERENCES public.past_papers(id) ON DELETE CASCADE,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, past_paper_id)
);

-- Create objective abundance polls table
CREATE TABLE public.objective_abundance_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  objective_id text NOT NULL,
  abundance text NOT NULL CHECK (abundance IN ('rare', 'common', 'always')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, objective_id)
);

-- Create threads_user_profiles table for display names and avatars
CREATE TABLE public.threads_user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  display_name text NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.past_paper_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marks_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_difficulty_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.objective_abundance_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threads_user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for past_papers
CREATE POLICY "Anyone can view past papers" ON public.past_papers FOR SELECT USING (true);

-- RLS Policies for past_paper_objectives
CREATE POLICY "Anyone can view objectives" ON public.past_paper_objectives FOR SELECT USING (true);

-- RLS Policies for marks_log
CREATE POLICY "Users can view their own marks" ON public.marks_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own marks" ON public.marks_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own marks" ON public.marks_log FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own marks" ON public.marks_log FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for paper_difficulty_votes
CREATE POLICY "Anyone can view difficulty votes" ON public.paper_difficulty_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote on difficulty" ON public.paper_difficulty_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own difficulty votes" ON public.paper_difficulty_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own difficulty votes" ON public.paper_difficulty_votes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for objective_abundance_votes
CREATE POLICY "Anyone can view abundance votes" ON public.objective_abundance_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote on abundance" ON public.objective_abundance_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own abundance votes" ON public.objective_abundance_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own abundance votes" ON public.objective_abundance_votes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for threads_user_profiles
CREATE POLICY "Anyone can view profiles" ON public.threads_user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.threads_user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.threads_user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger for updating threads_user_profiles timestamps
CREATE TRIGGER update_threads_user_profiles_updated_at
BEFORE UPDATE ON public.threads_user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert past papers data (2019-2025)
INSERT INTO public.past_papers (year, season, pdf_url) VALUES
  (2025, 'june', 'https://example.com/papers/2025-june.pdf'),
  (2024, 'november', 'https://example.com/papers/2024-november.pdf'),
  (2024, 'june', 'https://example.com/papers/2024-june.pdf'),
  (2023, 'november', 'https://example.com/papers/2023-november.pdf'),
  (2023, 'june', 'https://example.com/papers/2023-june.pdf'),
  (2022, 'november', 'https://example.com/papers/2022-november.pdf'),
  (2022, 'june', 'https://example.com/papers/2022-june.pdf'),
  (2021, 'november', 'https://example.com/papers/2021-november.pdf'),
  (2021, 'june', 'https://example.com/papers/2021-june.pdf'),
  (2020, 'november', 'https://example.com/papers/2020-november.pdf'),
  (2020, 'june', 'https://example.com/papers/2020-june.pdf'),
  (2019, 'november', 'https://example.com/papers/2019-november.pdf'),
  (2019, 'june', 'https://example.com/papers/2019-june.pdf'),
  (2018, 'november', 'https://example.com/papers/2018-november.pdf'),
  (2018, 'june', 'https://example.com/papers/2018-june.pdf'),
  (2017, 'november', 'https://example.com/papers/2017-november.pdf'),
  (2017, 'june', 'https://example.com/papers/2017-june.pdf'),
  (2016, 'november', 'https://example.com/papers/2016-november.pdf'),
  (2016, 'june', 'https://example.com/papers/2016-june.pdf'),
  (2015, 'november', 'https://example.com/papers/2015-november.pdf'),
  (2015, 'june', 'https://example.com/papers/2015-june.pdf'),
  (2014, 'november', 'https://example.com/papers/2014-november.pdf'),
  (2014, 'june', 'https://example.com/papers/2014-june.pdf'),
  (2013, 'november', 'https://example.com/papers/2013-november.pdf'),
  (2013, 'june', 'https://example.com/papers/2013-june.pdf');