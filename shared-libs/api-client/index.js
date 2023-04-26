const { FilmsServiceApi, CinemaServiceApi, TicketServiceApi } = require("cinema-tickets-client");
const ExtraApiClient = require('./ExtraApiClient');

const ticketsUrl = 'http://cinema-service:8080';
const filmsUrl = 'http://films-service:8070';
const cinemaUrl = 'http://cinema-service:8060';


exports.ticketsApi = new TicketServiceApi({ basePath: ticketsUrl});

exports.filmsApi = new FilmsServiceApi({ basePath: filmsUrl });

exports.cinemaApi = new CinemaServiceApi({ basePath: cinemaUrl});

exports.extraApi = new ExtraApiClient(ticketsUrl, filmsUrl, cinemaUrl);

