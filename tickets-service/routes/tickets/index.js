const BuyTicket = require("../../services/tickets/comands/BuyTicket");

exports.buyTicket = async (ctx) => {
    const { cinemaUid, filmUid } = ctx.params;

    const cmd = new BuyTicket({
        cinemaUid,
        filmUid,
        userName: ctx.get('X-User-Name'),
        ticketData: ctx.request.body
    });

    const result = await cmd.execute();
    if (result.isFailed) {
        ctx.status = 409;
        ctx.body = result.errors;
    } else {
        ctx.status = 201;
        ctx.set('Location', `/api/v1/tickets/${result.ticket.ticketUid}`);
    }
}
