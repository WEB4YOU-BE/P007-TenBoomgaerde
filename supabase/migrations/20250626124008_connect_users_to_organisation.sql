-- In this migration, we are connecting the users table to the organization table.
-- This is necessary because we want to associate users with their respective organizations.

ALTER TABLE public.reservations
RENAME COLUMN organizations_id TO organization_id;

CREATE TABLE IF NOT EXISTS public.users_organizations (
    "user_id" uuid NOT NULL,
    "organization_id" uuid NOT NULL,
    PRIMARY KEY (user_id, organization_id),
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE
);
ALTER TABLE public.users_organizations OWNER TO "postgres";

-- Create rows in the users_organizations table for existing users, based on the reservations they have made.
INSERT INTO public.users_organizations (user_id, organization_id)
SELECT DISTINCT r.user_id, o.id
FROM public.reservations r
JOIN public.organizations o ON r.organization_id = o.id;