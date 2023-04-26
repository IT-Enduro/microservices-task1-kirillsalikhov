const BaseCommand = require('../../../../shared-libs/services/BaseCommand');
const prisma = require("../../../prisma");

class ReleaseSeat extends BaseCommand {

    async doExecute() {
        const filmSession = this.cmdCtx.filmSession;
        this.cmdCtx.filmSession = await prisma.filmSession.update({
            where: {
                id: filmSession.id,
            },
            data: {
                booked_seats: filmSession.booked_seats - 1,
            },
        });
    }

    async validate() {
        const filmSession = await prisma.filmSession.findFirstOrThrow({
            where: {
                sessionUid: this.cmdCtx.sessionUid
            }
        });

        this.cmdCtx.filmSession = filmSession;

        const _hours = (t) => t * 60 * 60 * 1000;
        if (filmSession.date - new Date() < _hours(1)) {
            this.fail({message: 'Not enough time to cancel ticket'});
        }

        // TODO extract validation to separate func
        if ((filmSession.booked_seats - 1) < 0) {
            this.fail({message: `film session: ${this.cmdCtx.filmUid} no has seats left`});
        }
    }
}

module.exports = ReleaseSeat;
