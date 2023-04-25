-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "ticket_uid" TEXT NOT NULL,
    "film_uid" TEXT NOT NULL,
    "session_uid" TEXT NOT NULL,
    "user_name" VARCHAR(80) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticket_uid_key" ON "Ticket"("ticket_uid");
