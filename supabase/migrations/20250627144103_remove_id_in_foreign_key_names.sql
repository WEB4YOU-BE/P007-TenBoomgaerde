-- In this migration, we are removing the "_id" suffix from foreign key column names in all tables.

ALTER TABLE public.reservations
RENAME COLUMN "user_id" TO "booker";
ALTER TABLE public.reservations
RENAME COLUMN "organization_id" TO "organization";
ALTER TABLE public.reservations
RENAME COLUMN "product_id" TO "product";

ALTER TABLE public.reservation_halls
RENAME TO reservations_halls;
ALTER TABLE public.reservations_halls
RENAME COLUMN "reservation_id" TO "reservation";
ALTER TABLE public.reservations_halls
RENAME COLUMN "hall_id" TO "hall";

ALTER TABLE public.users_organizations
RENAME COLUMN "user_id" TO "user";
ALTER TABLE public.users_organizations
RENAME COLUMN "organization_id" TO "organization";

ALTER TABLE public.products
RENAME COLUMN "categorie_id" TO "category";