-- Migration: Add is_party boolean column to public.reservations with default false

-- 1) Add column if it doesn't exist, with default false
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = 'public'
			AND table_name = 'reservations'
			AND column_name = 'is_party'
	) THEN
		ALTER TABLE public.reservations
			ADD COLUMN is_party boolean DEFAULT false;
	END IF;
END $$;

-- 2) Ensure default is false (even if column pre-existed)
ALTER TABLE public.reservations
	ALTER COLUMN is_party SET DEFAULT false;

-- 3) Backfill based on number of connected halls: true if > 1, else false
DO $$
BEGIN
	-- If the link table exists, compute based on counts
	IF EXISTS (
		SELECT 1 FROM information_schema.tables
		WHERE table_schema = 'public' AND table_name = 'reservations_halls'
	) THEN
		UPDATE public.reservations r
		SET is_party = (
			SELECT COUNT(*) > 1
			FROM public.reservations_halls rh
			WHERE rh.reservation = r.id
		)
		WHERE r.is_party IS NULL;
	ELSE
		-- Fallback: set remaining NULLs to false
		UPDATE public.reservations
		SET is_party = false
		WHERE is_party IS NULL;
	END IF;
END $$;

-- Optional: helpful comment
COMMENT ON COLUMN public.reservations.is_party IS 'Indicates if the reservation is for a party. Defaults to false.';

