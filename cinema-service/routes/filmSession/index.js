const { ReleaseSeat } = require("../../services/cinema/commands");

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
