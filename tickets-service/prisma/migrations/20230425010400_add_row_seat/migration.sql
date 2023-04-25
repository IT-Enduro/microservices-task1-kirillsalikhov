/*
  Warnings:

  - Added the required column `row` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "row" INTEGER NOT NULL,
ADD COLUMN     "seat" INTEGER NOT NULL;
