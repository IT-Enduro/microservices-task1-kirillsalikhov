const { BuyTicket, CancelTicket } = require("../../services/tickets/commands");
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

    const result = await new BuyTicket({
        cinemaUid,
        filmUid,
        userName: ctx.get('X-User-Name'),
        ticketData: ctx.request.body
    })
        .execute();

    if (result.isFailed) {
        ctx.status = 409;
        ctx.body = result.errors;
    } else {
        ctx.status = 201;
        ctx.set('Location', ctx.router.url('ticketUid', result.ticket.ticketUid));
    }
}

exports.cancelTicket = async (ctx) => {
    const { ticketUid } = ctx.params;
    const result = await new CancelTicket({ ticketUid })
        .execute();

    if (result.isFailed) {
        ctx.status = 409;
        ctx.body = result.errors;
    } else {
        ctx.status = 204;
    }
}
