-- In this migration, we are separating the halls and reservations tables to allow multiple halls per reservation.
-- This is necessary because we want to allow a reservation to include multiple halls, which was not possible before.

-- We will create a new table called reservation_halls to link reservations and halls together.
-- This table will have a many-to-many relationship with both reservations and halls.

-- Then we will create all rows in the reservation_halls table for existing reservations, linking them to the halls they are associated with.
-- Finally, we will update the reservations table to remove the hall_id column, as it is no longer needed.

-- Create the new reservation_halls table
CREATE TABLE IF NOT EXISTS public.reservation_halls (
    "reservation_id" uuid NOT NULL,
    "hall_id" uuid NOT NULL,
    PRIMARY KEY (reservation_id, hall_id),
    FOREIGN KEY (reservation_id) REFERENCES public.reservations(id) ON DELETE CASCADE,
    FOREIGN KEY (hall_id) REFERENCES public.halls(id) ON DELETE CASCADE
);
ALTER TABLE public.reservation_halls OWNER TO "postgres";

-- Create rows in the reservation_halls table for existing reservations
INSERT INTO public.reservation_halls (reservation_id, hall_id)
SELECT r.id, h.id
FROM public.reservations r
JOIN public.halls h ON r.hall_id = h.id;

-- Remove the hall_id column from the reservations table
ALTER TABLE public.reservations
DROP COLUMN IF EXISTS hall_id;