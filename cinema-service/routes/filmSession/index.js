const { ReleaseSeat, BookSeat} = require("../../services/cinema/commands");

exports.releaseSeat = async (ctx) => {
    const { sessionUid } = ctx.params;
    const result = await new ReleaseSeat({ sessionUid })
        .execute();

    if (result.isFailed) {
        ctx.status = 409;
        ctx.body = { errors: result.errors }
    } else {
        ctx.body = result.filmSession;
    }
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
