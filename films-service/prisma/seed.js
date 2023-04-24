const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.film.upsert({
        where: { filmUid:"049161bb-badd-4fa8-9d90-87c9a82b0668" },
        update: {},
        create: {
            filmUid: "049161bb-badd-4fa8-9d90-87c9a82b0668",
            name: "Terminator 2 Judgment day",
            rating: 8.6,
            director: "James Cameron",
            producer: "James Cameron",
            genre: "Sci-Fi"
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
