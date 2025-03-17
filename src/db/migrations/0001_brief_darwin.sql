CREATE TYPE "public"."category" AS ENUM('girls', 'boys', 'walkathon');--> statement-breakpoint
ALTER TABLE "users" RENAME TO "master";--> statement-breakpoint
ALTER TABLE "master" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "master" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "unique_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "phone_no" text NOT NULL;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "usn" text;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "category" "category" NOT NULL;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "isCrossed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "crossTime" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "master" ADD COLUMN "isSitian" boolean DEFAULT false;