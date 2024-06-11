
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, email, firstname, lastname)
  values (new.id, new.Email, null, null);
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_admin"("user_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
        select is_admin from users
        where id = user_id
        $$;

ALTER FUNCTION "public"."is_admin"("user_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_access_code_trigger"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE
    current_week_start DATE;
    current_week_end DATE;
    new_access_code VARCHAR(4);
    arow RECORD;
BEGIN
    -- Controleer of access_code niet leeg is en status 'goedgekeurd' is
    IF NEW.access_code IS NULL AND NEW.status = 'goedgekeurd' THEN
        -- Krijg de start- en einddatum van de huidige week
        SELECT date_trunc('week', current_date)::DATE INTO current_week_start;
        current_week_end := current_week_start + INTERVAL '6 days';

        -- Controleer of de reservering binnen de huidige week valt
        IF (SELECT start_date FROM reservations WHERE id = NEW.id) BETWEEN current_week_start AND current_week_end THEN
            -- Zoek naar andere reserveringen in dezelfde week
            FOR arow IN
                SELECT access_code
                FROM reservations
                WHERE date_trunc('week', start_date)::DATE = current_week_start
            LOOP
                -- Kopieer de access_code als een andere reservering in dezelfde week wordt gevonden
                UPDATE reservations
                SET access_code = arow.access_code
                WHERE id = NEW.id;
                RETURN NEW;
            END LOOP;

            -- Als er geen andere reserveringen zijn, genereer een willekeurige access_code
            new_access_code := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
            UPDATE reservations
            SET access_code = new_access_code
            WHERE id = NEW.id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_access_code_trigger"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_customer_type"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
    -- Controleren op het aantal reserveringen in het afgelopen jaar
    IF (SELECT COUNT(*) FROM reservations
        WHERE user_id = NEW.user_id
        AND reservation_year >= CURRENT_DATE - INTERVAL '1 year') >= 10 THEN
        -- Bijwerken van type 
        UPDATE users
        SET type = 2
        WHERE id = NEW.user_id;
    END IF;

    RETURN NEW;
END;$$;

ALTER FUNCTION "public"."update_customer_type"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."bloks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "start_hour" time without time zone NOT NULL,
    "end_hour" time without time zone NOT NULL
);

ALTER TABLE "public"."bloks" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."categories" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."increment_by_one"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."increment_by_one" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "btw_number" "text" NOT NULL
);

ALTER TABLE "public"."organizations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "price" numeric,
    "for_sale" boolean,
    "categorie_id" "uuid"
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."reservations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "reservation_year" "date" NOT NULL,
    "reservation_number" numeric NOT NULL,
    "user_id" "uuid",
    "room_id" "uuid",
    "start_date" "date",
    "end_date" "date",
    "start_hour" "uuid",
    "end_hour" "uuid",
    "product_id" "uuid",
    "access_code" numeric,
    "status" "text" DEFAULT 'in afwachting'::"text",
    "gefactureerd" boolean DEFAULT false,
    "organizations_id" "uuid",
    "remarks" "text"
);

ALTER TABLE "public"."reservations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."rooms" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "private" boolean DEFAULT false NOT NULL,
    "day_price" real,
    "day_price2" real
);

ALTER TABLE "public"."rooms" OWNER TO "postgres";

COMMENT ON TABLE "public"."rooms" IS 'The rooms inside Ten Boomgaerde who are available for rent.';

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "firstname" "text",
    "lastname" "text",
    "is_admin" boolean DEFAULT false NOT NULL,
    "phone" "text",
    "street" "text",
    "postcode" "text",
    "city" "text",
    "email" character varying NOT NULL,
    "type" smallint DEFAULT '1'::smallint NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

COMMENT ON TABLE "public"."users" IS 'The users object for storing non-auth data';

COMMENT ON COLUMN "public"."users"."is_admin" IS 'This describes if the user is an admin to the platform';

ALTER TABLE ONLY "public"."bloks"
    ADD CONSTRAINT "bloks_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."rooms"
    ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "after_insert_reservation" AFTER INSERT ON "public"."reservations" FOR EACH ROW EXECUTE FUNCTION "public"."update_customer_type"();

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_end_hour_fkey" FOREIGN KEY ("end_hour") REFERENCES "public"."bloks"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_organizations_id_fkey" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_start_hour_fkey" FOREIGN KEY ("start_hour") REFERENCES "public"."bloks"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."reservations"
    ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for admin users" ON "public"."rooms" FOR DELETE USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable delete for authenticated users admin" ON "public"."categories" FOR DELETE TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable delete for authentitaced users admin" ON "public"."products" FOR DELETE USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable everything for admin users" ON "public"."bloks" TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable everything for admin users" ON "public"."reservations" TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable everything for admin users" ON "public"."users" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable everything for the admin users" ON "public"."organizations" TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."categories" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."products" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."reservations" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."users" FOR UPDATE TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all authenticated users" ON "public"."organizations" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."bloks" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."products" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."reservations" FOR SELECT USING (true);

CREATE POLICY "Enable room insert for authenticated users" ON "public"."rooms" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."users" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable update for authenticated users admin" ON "public"."categories" FOR UPDATE TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable update for for authenticated users admin" ON "public"."products" FOR UPDATE TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable update for users based on email" ON "public"."users" FOR UPDATE TO "authenticated" USING ((("auth"."jwt"() ->> 'email'::"text") = ("email")::"text")) WITH CHECK ((("auth"."jwt"() ->> 'email'::"text") = ("email")::"text"));

CREATE POLICY "Full access on all users for admins" ON "public"."rooms" TO "authenticated" USING ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Non-private rooms can be viewed by everyone" ON "public"."rooms" FOR SELECT USING (("private" = false));

CREATE POLICY "Products can be viewed by everyone" ON "public"."products";

ALTER TABLE "public"."bloks" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."reservations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."rooms" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."bloks";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."categories";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."organizations";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."products";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."reservations";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."rooms";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."users";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"("user_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."update_access_code_trigger"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_access_code_trigger"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_access_code_trigger"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_customer_type"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_customer_type"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_customer_type"() TO "service_role";

GRANT ALL ON TABLE "public"."bloks" TO "anon";
GRANT ALL ON TABLE "public"."bloks" TO "authenticated";
GRANT ALL ON TABLE "public"."bloks" TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."increment_by_one" TO "anon";
GRANT ALL ON SEQUENCE "public"."increment_by_one" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."increment_by_one" TO "service_role";

GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON TABLE "public"."reservations" TO "anon";
GRANT ALL ON TABLE "public"."reservations" TO "authenticated";
GRANT ALL ON TABLE "public"."reservations" TO "service_role";

GRANT ALL ON TABLE "public"."rooms" TO "anon";
GRANT ALL ON TABLE "public"."rooms" TO "authenticated";
GRANT ALL ON TABLE "public"."rooms" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
