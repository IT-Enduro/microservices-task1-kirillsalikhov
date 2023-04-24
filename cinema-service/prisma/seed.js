const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.cinema.upsert({
        where: { cinemaUid:"06cc4ba3-ee97-4d29-a814-c40588290d17" },
        update: {},
        create: {
            cinemaUid: "06cc4ba3-ee97-4d29-a814-c40588290d17",
            name: "Кинотеатр Москва",
            address: "Ереван, улица Хачатура Абовяна, 18",
            filmSessions: {
                create: [
                    {
                        film_uid: "049161bb-badd-4fa8-9d90-87c9a82b0668",
                        date: new Date("2024-01-01T08:00:00"),
                        total_seats: 5000,
                        booked_seats: 0
                    }
                ]
            }
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
