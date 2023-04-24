const { getFilms } = require("../../services/film/queries");

exports.list = async (ctx) => {
    ctx.body = await getFilms();
}
