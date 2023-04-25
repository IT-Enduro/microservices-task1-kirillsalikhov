const axios = require('axios');

// client with methods that should be normally generated

class ExtraApiClient {
    constructor(ticketsUrl, filmsUrl, cinemaUrl) {

        const createClient = url => axios.create({
            baseURL: `${url}/api/v1`
        });

        this.ticketsClient = createClient(ticketsUrl);
        this.filmsClient = createClient(filmsUrl);
        this.cinemaClient = createClient(cinemaUrl);
    }

    async cinemaBookSeat(cinemaUid, filmUid) {
        return await this.cinemaClient
            .patch(`/cinema/${cinemaUid}/films/${filmUid}/book-seat`)
            .then( (res) => {
                return res.data;
            });
    }
}

module.exports = ExtraApiClient;
