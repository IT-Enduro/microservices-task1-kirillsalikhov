const BuyTicket = require("../../services/tickets/commands/BuyTicket");
const prisma = require("../../prisma");

exports.show = async (ctx) => {
    ctx.body = await prisma.ticket.findUniqueOrThrow({
        where: {
            ticketUid: ctx.params.ticketUid,
        },
        select: {
            ticketUid: true,
            status: true,
            date: true,
            row: true,
            seat: true
        },
    });
}

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
        ctx.set('Location', ctx.router.url('ticketUid', result.ticket.ticketUid));
    }
}
