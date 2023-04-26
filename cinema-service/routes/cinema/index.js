const { getCinemas, getCinema} = require("../../services/cinema/queries");
const { BookSeat } = require("../../services/cinema/commands");
const { getFilmsForCinema} = require("../../services/external/films/queries");
const { cinemaWithFilmsToJson } = require("../../serializers");


exports.list = async (ctx) => {
    // TODO add Serializer
    // TODO Add pagination
    ctx.body = await getCinemas();
}

exports.films = async (ctx) => {
    const cinema = await getCinema(ctx.params.cinemaUid);
    // TODO throw err and move to midleware ?
    if (cinema === null) {
        ctx.status = 404;
        return;
    }

    const films = await getFilmsForCinema(cinema);
    ctx.body = cinemaWithFilmsToJson(cinema, films);
}

exports.bookSeat = async (ctx) => {
    const { cinemaUid, filmUid } = ctx.params;

    const bookSeatCmd = new BookSeat({ cinemaUid, filmUid });

    const result = await bookSeatCmd.execute();

    if (result.isFailed) {
        ctx.status = 409;
        ctx.body = { errors: result.errors };
    } else {
        ctx.body = result.filmSession;
    }
}
