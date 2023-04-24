const { FilmsServiceApi, CinemaServiceApi, TicketServiceApi } = require("./generated/dist");

exports.filmsApi = new FilmsServiceApi({ basePath: 'http://films-service:8070' });

exports.cinemaApi = new CinemaServiceApi({ basePath:'http://cinema-service:8060' });

exports.ticketsApi = new TicketServiceApi({ basePath:'http://cinema-service:8080' })
