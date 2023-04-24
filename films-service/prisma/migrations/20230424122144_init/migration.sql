-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "film_uid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "rating" DECIMAL(8,2) NOT NULL DEFAULT 10,
    "director" VARCHAR(255),
    "producer" VARCHAR(255),
    "genre" VARCHAR(255) NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Film_film_uid_key" ON "Film"("film_uid");
