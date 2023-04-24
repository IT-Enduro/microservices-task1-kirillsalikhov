const prisma = require("../../prisma");

exports.getCinemas = async function() {
    return prisma.cinema.findMany();
}

async function getCinema(cinemaUid) {
    return prisma.cinema.findUnique({
        where: { cinemaUid },
        include: {
            filmSessions: true,
        }
    })
}
exports.getCinema = getCinema;
