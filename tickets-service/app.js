const Koa = require('koa');

const port = 8080;

new Koa()
    .use(async ctx => {
        ctx.body = `Hello`;
    })
    .listen(port, () => {
        console.log(`Ready to receive requests on ${port}`);
    })
