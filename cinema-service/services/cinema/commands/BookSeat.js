const BaseCommand = require('../../../../shared-libs/services/BaseCommand');
const prisma = require("../../../prisma");
const { getCinema } = require("../queries");

class BookSeat extends BaseCommand {

    async doExecute() {
        const filmSession = this.cmdCtx.filmSession;
        this.cmdCtx.filmSession = await prisma.filmSession.update({
            where: {
                id: filmSession.id,
            },
            data: {
                booked_seats: filmSession.booked_seats + 1,
            },
        });
    }

    async validate() {
        const cinema = await getCinema(this.cmdCtx.cinemaUid);

        if (cinema === null) {
            this.fail({message: `cinema: ${this.cmdCtx.cinemaUid} not found`});
        }

        const fs = cinema.filmSessions.find(fs => fs.film_uid === this.cmdCtx.filmUid);
        if (fs === undefined) {
            this.fail({message: `film session: ${this.cmdCtx.filmUid} not found`});
        }

        // TODO validation is not best place
        // may be make query for that for film session 
        this.cmdCtx.filmSession = fs;

        // TODO extract validation for filmSession
        if ((fs.booked_seats + 1) > fs.total_seats) {
            this.fail({message: `film session: ${this.cmdCtx.filmUid} no has seats left`});
        }
    }
}

module.exports = BookSeat;
