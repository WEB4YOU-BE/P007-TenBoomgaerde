-- Replace 'Particulier Feest (za of zo - volledige dag)' with three halls in reservations_halls
DO $$
DECLARE
    old_hall_id UUID;
    grote_zaal_id UUID;
    kleine_zaal_id UUID;
    bovenzaal_id UUID;
BEGIN
    -- Get the UUIDs for the halls
    SELECT id INTO old_hall_id FROM halls WHERE name = 'Particulier Feest (za of zo - volledige dag) ';
    SELECT id INTO grote_zaal_id FROM halls WHERE name = 'Grote zaal';
    SELECT id INTO kleine_zaal_id FROM halls WHERE name = 'Kleine zaal';
    SELECT id INTO bovenzaal_id FROM halls WHERE name = 'Bovenzaal';

    -- For each reservation using the old hall, insert three rows for the new halls
    INSERT INTO reservations_halls (reservation, hall)
    SELECT reservation, grote_zaal_id FROM reservations_halls WHERE hall = old_hall_id;
    INSERT INTO reservations_halls (reservation, hall)
    SELECT reservation, kleine_zaal_id FROM reservations_halls WHERE hall = old_hall_id;
    INSERT INTO reservations_halls (reservation, hall)
    SELECT reservation, bovenzaal_id FROM reservations_halls WHERE hall = old_hall_id;

    -- Remove all references to the old hall in reservations_halls
    DELETE FROM reservations_halls WHERE hall = old_hall_id;

    -- Delete the old hall from halls
    DELETE FROM halls WHERE id = old_hall_id;
END $$;
