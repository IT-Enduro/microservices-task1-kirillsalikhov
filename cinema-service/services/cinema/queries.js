const prisma = require("../../prisma");

exports.getCinemas = async function () {
    return prisma.cinema.findMany();
}
