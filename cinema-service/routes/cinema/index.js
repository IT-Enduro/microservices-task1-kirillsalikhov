const prisma = require("../../prisma");
const { paginate } = require("../../../shared-libs/services/queryUtils");

const { getCinema } = require("../../services/cinema/queries");

const { BookSeat } = require("../../services/cinema/commands");
const { getFilmsForCinema} = require("../../services/external/films/queries");
const { cinemaWithFilmsToJson } = require("../../serializers");


exports.list = async (ctx) => {
    ctx.body = await paginate(prisma.cinema, {}, ctx.request.query)
}

exports.films = async (ctx) => {
    const cinemaUid = ctx.params.cinemaUid;
    const cinema = await prisma.cinema.findUniqueOrThrow({
        where: { cinemaUid },
        include: {
            filmSessions: true,
        }
    });

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
