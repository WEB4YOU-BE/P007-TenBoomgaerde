-- Migration: Refactor reservations.status to enum (ACCEPTED | PENDING | DECLINED)
-- Keep similar structure to organisations acceptance_status migration

-- 1) Create enum type if it doesn't exist
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'reservation_status' AND n.nspname = 'public'
	) THEN
		CREATE TYPE public.reservation_status AS ENUM ('ACCEPTED', 'PENDING', 'DECLINED');
	END IF;
END $$;

-- 2) Rename existing text status column to _deprecated_status (if it exists)
DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = 'public'
		  AND table_name = 'reservations'
		  AND column_name = 'status'
	) THEN
		EXECUTE 'ALTER TABLE public.reservations RENAME COLUMN "status" TO "_deprecated_status"';
	END IF;
END $$;

-- 3) Add new enum status column (nullable first for safety)
ALTER TABLE public.reservations
	ADD COLUMN IF NOT EXISTS status public.reservation_status;

-- 4) Ensure default is PENDING for new inserts
ALTER TABLE public.reservations
	ALTER COLUMN status SET DEFAULT 'PENDING'::public.reservation_status;

-- 5) Backfill from _deprecated_status where NULL
-- Map Dutch strings to enum values (case-insensitive)
UPDATE public.reservations
SET status = CASE
	WHEN _deprecated_status ILIKE 'goedgekeurd' THEN 'ACCEPTED'::public.reservation_status
	WHEN _deprecated_status ILIKE 'in afwachting' THEN 'PENDING'::public.reservation_status
	WHEN _deprecated_status ILIKE 'geweigerd' THEN 'DECLINED'::public.reservation_status
	ELSE 'PENDING'::public.reservation_status
END
WHERE status IS NULL
  AND EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_schema = 'public'
		  AND table_name = 'reservations'
		  AND column_name = '_deprecated_status'
	);

-- 6) Enforce NOT NULL after backfill
ALTER TABLE public.reservations
	ALTER COLUMN status SET NOT NULL;

-- Optional: add a helpful comment
COMMENT ON COLUMN public.reservations.status IS 'Reservation status: ACCEPTED | PENDING | DECLINED. Defaults to PENDING. Old values preserved in _deprecated_status.';

