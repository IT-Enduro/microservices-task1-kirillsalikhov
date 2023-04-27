const { filmsApi } = require('../../../../shared-libs/api-client');

async function getFilms() {
    const response = await filmsApi.apiV1FilmsGet();
    return response.data;
}
exports.getFilms = getFilms

async function getFilmsForCinema(cinema) {
    // TODO add method fetch films by uuids to film service
    const filmsPaginated = await getFilms();

    const filmIdx = filmsPaginated.items.reduce((idx, f) => {
        idx[f.filmUid] = f;
        return idx;
    }, {});

    // TODO check if no film for film_uid
    // TODO rename film_uid => filmUid?
    return cinema.filmSessions
        .map( fs => filmIdx[fs.film_uid]);
}

exports.getFilmsForCinema = getFilmsForCinema;
