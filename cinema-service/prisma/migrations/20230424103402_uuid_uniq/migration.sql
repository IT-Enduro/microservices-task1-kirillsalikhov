/*
  Warnings:

  - A unique constraint covering the columns `[cinema_uid]` on the table `Cinema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[film_uid]` on the table `FilmSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cinema_cinema_uid_key" ON "Cinema"("cinema_uid");

-- CreateIndex
CREATE UNIQUE INDEX "FilmSession_film_uid_key" ON "FilmSession"("film_uid");
