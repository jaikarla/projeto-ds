ALTER TABLE faturistas
  ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(64);

ALTER TABLE faturistas
  ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_faturistas_reset_password_token
  ON faturistas(reset_password_token);
