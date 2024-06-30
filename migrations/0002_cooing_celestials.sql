CREATE TABLE IF NOT EXISTS "order_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"productId" integer NOT NULL,
	"count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders_table" RENAME TO "cart_table";