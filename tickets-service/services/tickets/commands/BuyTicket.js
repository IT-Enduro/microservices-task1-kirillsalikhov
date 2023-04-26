const BaseCommand = require('../../../../shared-libs/services/BaseCommand');
const { extraApi } = require('../../../../shared-libs/api-client');

const prisma = require("../../../prisma");

class BuyTicket extends BaseCommand {

    async doExecute() {
        await this._bookSeat();
        await this._createTicket();
    }

    async _bookSeat() {
        try {
            const { cinemaUid, filmUid } = this.cmdCtx;
            this.cmdCtx.filmSession = await extraApi.cinemaBookSeat(cinemaUid, filmUid);
        } catch (e) {
            if (e?.response?.data?.errors) {
                this.fail(e.response.data.errors);
            } else {
                this.fail({message: 'internal service wrong response'})
            }
        }
    }

    async _createTicket() {
        this.cmdCtx.ticket = await prisma.ticket.create({
            data: this._getTicketData()
        });
    }

    _getTicketData() {
        const { date, row, seat } = this.cmdCtx.ticketData
        const { filmUid, filmSession, userName } = this.cmdCtx;

        // TODO move BOOKED to enum
        return {
            film_uid: filmUid,
            session_uid: filmSession.sessionUid,
            userName,
            row,
            seat,
            date: new Date(date),
            status: 'BOOKED'
        }
    }
}

module.exports = BuyTicket;
