CREATE TABLE IF NOT EXISTS "mileage" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_id" serial NOT NULL,
	"mileage" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mileage" ADD CONSTRAINT "mileage_car_id_car_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
