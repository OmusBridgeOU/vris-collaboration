-- Approved scope: remove retired authentication and manufacturing workflow data.
-- Apply only after operator approval and a private D1 backup. No R2 objects are deleted.
-- Order IDs, reception numbers, token hashes, quantities, image references, status
-- and legacy image-deletion markers remain available to the retained read APIs.
DROP INDEX IF EXISTS idx_order_batches_expires_at;

ALTER TABLE order_batches DROP COLUMN buyer_confirmed_at;
ALTER TABLE order_batches DROP COLUMN expires_at;
ALTER TABLE order_batches DROP COLUMN accepted_at;
ALTER TABLE order_batches DROP COLUMN production_started_at;
ALTER TABLE order_batches DROP COLUMN ready_at;
ALTER TABLE order_batches DROP COLUMN delivered_at;
ALTER TABLE order_batches DROP COLUMN rejected_at;
ALTER TABLE order_batches DROP COLUMN cancelled_at;
ALTER TABLE order_batches DROP COLUMN accepted_by;
ALTER TABLE order_batches DROP COLUMN production_by;
ALTER TABLE order_batches DROP COLUMN delivered_by;
ALTER TABLE order_batches DROP COLUMN rejection_reason;

ALTER TABLE order_items DROP COLUMN production_started_at;
ALTER TABLE order_items DROP COLUMN ready_at;
ALTER TABLE order_items DROP COLUMN delivered_at;
ALTER TABLE order_items DROP COLUMN rejected_at;
ALTER TABLE order_items DROP COLUMN rejection_reason;
ALTER TABLE order_items DROP COLUMN reprint_count;

DROP TABLE user_roles;
DROP TABLE roles;
DROP TABLE users;
DROP TABLE login_attempts;
DROP TABLE order_sequences;
DROP TABLE audit_logs;
