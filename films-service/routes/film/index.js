const prisma = require("../../prisma");
const { paginate } = require("../../../shared-libs/services/queryUtils");

const serializeFilm = f => { return {...f, ...{rating: parseFloat(f.rating)}} }

exports.list = async (ctx) => {
    const result = await paginate(prisma.film, {}, ctx.request.query);
    result.items = result.items.map(serializeFilm);
    ctx.body = result;
}
