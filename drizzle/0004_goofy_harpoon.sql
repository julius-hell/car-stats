ALTER TABLE "mileage" DROP CONSTRAINT "mileage_car_id_car_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "primary_car" integer;