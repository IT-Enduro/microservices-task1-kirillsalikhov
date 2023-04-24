const pick = (...fields) => {
    return (o) => {
        const res = {};
        fields.forEach(f => {
            res[f] = o[f];
        });
        return res;
    };
}

const cinemaSerialize = pick('cinemaUid', 'name', 'address');
const filmSerialize = pick('filmUid', 'name', 'rating', 'director', 'producer', 'genre');

exports.cinemaWithFilmsToJson = (cinema, films = []) => {
    const cinemaRes = cinemaSerialize(cinema);
    cinemaRes.films = films.map(filmSerialize);
    return cinemaRes;
}
