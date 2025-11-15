/*
  Warnings:

  - You are about to drop the column `cityId` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_stopId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Route" DROP CONSTRAINT "Route_cityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Schedule" DROP CONSTRAINT "Schedule_routeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stop" DROP CONSTRAINT "Stop_routeId_fkey";

-- DropIndex
DROP INDEX "public"."Route_cityId_idx";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "cityId",
DROP COLUMN "color",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
DROP COLUMN "password",
DROP COLUMN "updatedAt",
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."City";

-- DropTable
DROP TABLE "public"."Feedback";

-- DropTable
DROP TABLE "public"."Schedule";

-- DropTable
DROP TABLE "public"."Stop";

-- DropEnum
DROP TYPE "public"."FeedbackKind";

-- DropEnum
DROP TYPE "public"."FeedbackStatus";

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "alias" TEXT,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "orderNo" INTEGER NOT NULL,
    "stopName" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteSuggestion" (
    "id" TEXT NOT NULL,
    "originPlaceId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "RouteSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_name_idx" ON "Place"("name");

-- CreateIndex
CREATE INDEX "UserFavorite_userId_idx" ON "UserFavorite"("userId");

-- CreateIndex
CREATE INDEX "UserFavorite_placeId_idx" ON "UserFavorite"("placeId");

-- CreateIndex
CREATE INDEX "RouteStop_routeId_idx" ON "RouteStop"("routeId");

-- CreateIndex
CREATE INDEX "RouteSuggestion_originPlaceId_idx" ON "RouteSuggestion"("originPlaceId");

-- CreateIndex
CREATE INDEX "RouteSuggestion_destinationId_idx" ON "RouteSuggestion"("destinationId");

-- CreateIndex
CREATE INDEX "RouteSuggestion_routeId_idx" ON "RouteSuggestion"("routeId");

-- CreateIndex
CREATE INDEX "News_routeId_idx" ON "News"("routeId");

-- CreateIndex
CREATE INDEX "Route_code_idx" ON "Route"("code");

-- CreateIndex
CREATE INDEX "Route_name_idx" ON "Route"("name");
