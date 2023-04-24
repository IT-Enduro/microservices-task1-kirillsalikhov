const prisma = require('../../prisma');

const cinemas = [
    {name: 'cinema one'},
    {name: 'cinema two'},
];

const films = [
    {name: 'film one'},
    {name: 'film two'},
]

exports.list = async (ctx) => {
    ctx.body = await prisma.cinema.findMany();
}

exports.films = async (ctx) => {
    ctx.body = films;
}
