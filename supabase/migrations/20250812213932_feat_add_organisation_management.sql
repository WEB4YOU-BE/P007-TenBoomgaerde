-- Feature: Organisation management - acceptance status
-- Adds an enum and column to track organisation acceptance state.

-- 1) Create enum type if it doesn't exist
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1 FROM pg_type t
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE t.typname = 'organization_acceptance_status' AND n.nspname = 'public'
	) THEN
		CREATE TYPE public.organization_acceptance_status AS ENUM ('ACCEPTED', 'PENDING', 'DECLINED');
	END IF;
END $$;

-- 2) Add acceptance_status column to organizations (nullable first for safety)
ALTER TABLE public.organizations
	ADD COLUMN IF NOT EXISTS acceptance_status public.organization_acceptance_status;

-- 3) Ensure default is PENDING for new inserts
ALTER TABLE public.organizations
	ALTER COLUMN acceptance_status SET DEFAULT 'PENDING';

-- 4) Backfill existing rows where NULL
UPDATE public.organizations
	SET acceptance_status = 'PENDING'
	WHERE acceptance_status IS NULL;

-- 5) Enforce NOT NULL after backfill
ALTER TABLE public.organizations
	ALTER COLUMN acceptance_status SET NOT NULL;

-- Optional: add a helpful comment
COMMENT ON COLUMN public.organizations.acceptance_status IS 'Acceptance workflow status for organizations: ACCEPTED | PENDING | DECLINED. Defaults to PENDING for new records.';

