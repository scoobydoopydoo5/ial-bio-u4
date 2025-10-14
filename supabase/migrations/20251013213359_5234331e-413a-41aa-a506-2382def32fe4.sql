-- Fix function search path security issue with CASCADE
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the triggers that were dropped
CREATE TRIGGER update_threads_posts_updated_at
BEFORE UPDATE ON public.threads_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threads_comments_updated_at
BEFORE UPDATE ON public.threads_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threads_user_profiles_updated_at
BEFORE UPDATE ON public.threads_user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();