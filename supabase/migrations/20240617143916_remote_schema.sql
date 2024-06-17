set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_access_code_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
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
$function$
;


