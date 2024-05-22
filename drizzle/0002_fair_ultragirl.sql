CREATE TABLE IF NOT EXISTS "car" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"make" text,
	"model" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "car" ADD CONSTRAINT "car_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
