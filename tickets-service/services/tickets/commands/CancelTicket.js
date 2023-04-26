const BaseCommand = require('../../../../shared-libs/services/BaseCommand');
const { extraApi } = require('../../../../shared-libs/api-client');

const prisma = require("../../../prisma");

class CancelTicket extends BaseCommand {

    async doExecute() {
        await this._releaseSeat();
        await this._cancelTicket();
    }

    async validate() {
        await this._getTicket();
        // TODO use enum for Canceled
        if (this.cmdCtx.ticket.status === 'CANCELED') {
            this.fail({message: `Ticket: ${this.cmdCtx.ticketUid} already canceled`});
        }
    }

    async _getTicket() {
        this.cmdCtx.ticket = await prisma.ticket.findUniqueOrThrow({
            where: { ticketUid: this.cmdCtx.ticketUid }
        })
    }

    async _releaseSeat() {
        try {
            const session_uid = this.cmdCtx.ticket.session_uid;
            this.cmdCtx.filmSession = await extraApi.cinemaReleaseSeat(session_uid);
        } catch (e) {
            if (e?.response?.data?.errors) {
                this.fail(e.response.data.errors);
            } else {
                this.fail({message: 'internal service wrong response'})
            }
        }
    }
    async _cancelTicket() {
        this.cmdCtx.ticket = await prisma.ticket.update({
            where: {
                ticketUid: this.cmdCtx.ticket.ticketUid,
            },
            data: {
                status: 'CANCELED'
            }
        });
    }

}

module.exports = CancelTicket;
