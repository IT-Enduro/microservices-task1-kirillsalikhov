const prisma = require("../../prisma");

exports.getFilms = async function () {
    return prisma.film.findMany();
}
