const BaseCommand = require('../../../../shared-libs/services/BaseCommand');
const prisma = require("../../../prisma");

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
        const { cinemaUid, filmUid }= this.cmdCtx;

        const cinema = await prisma.cinema.findUniqueOrThrow({
            where: { cinemaUid },
            include: {
                filmSessions: true,
            }
        })

        const fs = cinema.filmSessions.find(fs => fs.film_uid === filmUid);
        if (fs === undefined) {
            this.fail({message: `film session: ${filmUid} not found`});
        }

        // TODO may be make query for that for film session
        this.cmdCtx.filmSession = fs;

        // TODO extract validation for filmSession
        // not filmUid probably?
        if ((fs.booked_seats + 1) > fs.total_seats) {
            this.fail({message: `film session: ${filmUid} no has seats left`});
        }
    }
}

module.exports = BookSeat;
