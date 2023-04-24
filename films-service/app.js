const Koa = require('koa');

const port = 8070;

const app = new Koa()
    .use(async ctx => {
        ctx.body = 'Films service gateway';
    })
    .listen(port, () => {
        console.log(`Ready to receive requests on ${port}`);
    });

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, function() {
        console.log('Closing server');
        app.close(process.exit);
    });
});
