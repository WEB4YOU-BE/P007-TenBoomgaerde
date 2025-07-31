-- Rename tables
ALTER TABLE IF EXISTS public.rooms
RENAME TO halls;
ALTER TABLE IF EXISTS public.bloks
RENAME TO timeslots;

-- Rename columns in halls
ALTER TABLE IF EXISTS public.halls
RENAME COLUMN private TO is_private;
ALTER TABLE IF EXISTS public.halls
RENAME COLUMN day_price TO price_per_day;
ALTER TABLE IF EXISTS public.halls
RENAME COLUMN day_price2 TO price_per_day_discount;

-- Rename columns in reservations
ALTER TABLE IF EXISTS public.reservations
RENAME COLUMN room_id TO hall_id;
ALTER TABLE IF EXISTS public.reservations
RENAME COLUMN start_hour TO start_timeslot_id;
ALTER TABLE IF EXISTS public.reservations
RENAME COLUMN end_hour TO end_timeslot_id;

-- Rename columns in timeslots
ALTER TABLE IF EXISTS public.timeslots
RENAME COLUMN start_hour TO start_time;
ALTER TABLE IF EXISTS public.timeslots
RENAME COLUMN end_hour TO end_time;

-- Rename columns in users
ALTER TABLE IF EXISTS public.users
RENAME COLUMN street to address_street;
ALTER TABLE IF EXISTS public.users
ADD COLUMN address_number text;
ALTER TABLE IF EXISTS public.users
RENAME COLUMN postcode TO address_postal_code;
ALTER TABLE IF EXISTS public.users
RENAME COLUMN city TO address_city;

-- First, we need to set reservations.start_date and end_date to a timestamp instead of just a date.
-- This is necessary because we will later merge the timeslot start_hour and end_hour into these
-- columns, which will include the time of day as well.
ALTER TABLE public.reservations
ALTER COLUMN start_date TYPE timestamp without time zone USING start_date::timestamp without time zone,
ALTER COLUMN end_date TYPE timestamp without time zone USING end_date::timestamp without time zone;

-- Merge the timeslot start_hour and end_hour into reservations.start_date and end_date
-- The start_date and end_date look like this: 2024-01-01T08:00:00.000Z
-- The start_time and end_time look like this: 08:00:00
-- The start_date and end_date will be updated to include the timeslot time
UPDATE public.reservations r
SET start_date = r.start_date::date + t_start.start_time,
    end_date = r.end_date::date + t_end.end_time
FROM public.timeslots t_start, public.timeslots t_end
WHERE r.start_timeslot_id = t_start.id
  AND r.end_timeslot_id = t_end.id
  AND r.start_timeslot_id IS NOT NULL
  AND r.end_timeslot_id IS NOT NULL;

-- Finally, we can drop the start_hour and end_hour columns from reservations
ALTER TABLE public.reservations
DROP COLUMN start_timeslot_id,
DROP COLUMN end_timeslot_id;

-- rename the columns in reservations
ALTER TABLE public.reservations
RENAME COLUMN "start_date" TO "start";
ALTER TABLE public.reservations
RENAME COLUMN "end_date" TO "end";
ALTER TABLE public.reservations
RENAME COLUMN "gefactureerd" TO "invoiced";

-- rename the columns in organizations
ALTER TABLE IF EXISTS public.organizations
RENAME COLUMN "btw_number" TO "vat";