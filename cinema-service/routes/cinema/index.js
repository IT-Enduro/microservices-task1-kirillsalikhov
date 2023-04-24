const { getCinemas } = require("../../services/cinema/queries");

const films = [
    {name: 'film one'},
    {name: 'film two'},
]

exports.list = async (ctx) => {
    ctx.body = await getCinemas();
}

exports.films = async (ctx) => {
    ctx.body = films;
}
