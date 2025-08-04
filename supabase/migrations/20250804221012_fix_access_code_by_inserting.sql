-- Remove old trigger/function
DROP TRIGGER IF EXISTS update_access_code_trigger ON reservations;
DROP FUNCTION IF EXISTS public.update_access_code_trigger();

-- Create week_access_codes table
CREATE TABLE IF NOT EXISTS week_access_codes (
    week_start DATE PRIMARY KEY,
    access_code INTEGER NOT NULL CHECK (access_code >= 0 AND access_code < 10000)
);

-- Assign access codes to existing reservations per week
DO $$
BEGIN
    INSERT INTO week_access_codes (week_start, access_code)
    SELECT week_start, FLOOR(RANDOM() * 10000)::INTEGER
    FROM (
        SELECT DISTINCT date_trunc('week', start)::DATE AS week_start
        FROM reservations
    ) weeks
    ON CONFLICT (week_start) DO NOTHING;

    UPDATE reservations r
    SET access_code = w.access_code
    FROM week_access_codes w
    WHERE date_trunc('week', r.start)::DATE = w.week_start;
END $$;

-- Remove default from access_code column
ALTER TABLE reservations ALTER COLUMN access_code DROP DEFAULT;

-- Function to set access_code on insert
CREATE OR REPLACE FUNCTION public.set_access_code_per_week()
RETURNS TRIGGER AS $$
DECLARE
    week_code INTEGER;
BEGIN
    IF NEW.access_code IS NULL THEN
        SELECT access_code INTO week_code
        FROM week_access_codes
        WHERE week_start = date_trunc('week', NEW.start)::DATE;

        IF week_code IS NULL THEN
            week_code := FLOOR(RANDOM() * 10000)::INTEGER;
            INSERT INTO week_access_codes (week_start, access_code)
            VALUES (date_trunc('week', NEW.start)::DATE, week_code);
        END IF;
        NEW.access_code := week_code;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for reservations
DROP TRIGGER IF EXISTS set_access_code_per_week_trigger ON reservations;
CREATE TRIGGER set_access_code_per_week_trigger
    BEFORE INSERT ON reservations
    FOR EACH ROW EXECUTE FUNCTION public.set_access_code_per_week();