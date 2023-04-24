-- CreateTable
CREATE TABLE "Cinema" (
    "id" SERIAL NOT NULL,
    "cinema_uid" TEXT NOT NULL,
    "name" VARCHAR(255),
    "address" VARCHAR(255),

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilmSession" (
    "id" SERIAL NOT NULL,
    "session_uid" TEXT NOT NULL,
    "film_uid" TEXT NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "booked_seats" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "cinema_id" INTEGER NOT NULL,

    CONSTRAINT "FilmSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FilmSession" ADD CONSTRAINT "FilmSession_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
