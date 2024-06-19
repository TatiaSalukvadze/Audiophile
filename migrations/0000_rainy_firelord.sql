CREATE TABLE IF NOT EXISTS "orders_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"productId" integer NOT NULL,
	"count" integer NOT NULL
);
