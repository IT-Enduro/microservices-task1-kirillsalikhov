const cinemas = [
    {name: 'cinema one'},
    {name: 'cinema two'},
];

const films = [
    {name: 'film one'},
    {name: 'film two'},
]

exports.list = async (ctx) => {
    ctx.body = cinemas;
}

exports.films = async (ctx) => {
    ctx.body = films;
}
