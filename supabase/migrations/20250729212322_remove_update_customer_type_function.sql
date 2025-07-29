-- Drop the trigger that depends on the function, if it exists
DROP TRIGGER IF EXISTS after_insert_reservation ON reservations;

-- Drop the faulty function if it exists
DROP FUNCTION IF EXISTS update_customer_type();
