-- Add question paper and mark scheme URLs to past_papers table
ALTER TABLE past_papers 
ADD COLUMN question_paper_url TEXT,
ADD COLUMN mark_scheme_url TEXT;

-- Update existing pdf_url to question_paper_url
UPDATE past_papers SET question_paper_url = pdf_url WHERE pdf_url IS NOT NULL;