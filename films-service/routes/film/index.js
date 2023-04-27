const prisma = require("../../prisma");

const serializeFilm = f => { return {...f, ...{rating: parseFloat(f.rating)}} }

exports.list = async (ctx) => {
    const page = parseInt(ctx.request.query.page) || 1;
    const pageSize = parseInt(ctx.request.query.size) || 10;

    const films = await prisma.film.findMany({
        skip: (page -1) * pageSize,
        take: pageSize
    });
    const totalElements = await prisma.film.count();

    ctx.body =  {
        page,
        pageSize,
        totalElements,
        items: films.map(serializeFilm)
    }
}
