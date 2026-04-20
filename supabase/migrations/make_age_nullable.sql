-- Allow age column to be NULL
ALTER TABLE public.candidates
ALTER COLUMN age DROP NOT NULL;

-- Allow date_of_birth column to be NULL (it may already be nullable)
ALTER TABLE public.candidates
ALTER COLUMN date_of_birth DROP NOT NULL;

-- Allow star column to be NULL (it may already be nullable)
ALTER TABLE public.candidates
ALTER COLUMN star DROP NOT NULL;
