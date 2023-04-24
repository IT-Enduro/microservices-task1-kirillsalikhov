const Koa = require('koa');

const prisma = require('./prisma');
const router = require('./routes/router');

// TODO add prisma check connection

const port = 8080;

const app = new Koa();
    app.use(router.routes());

const server = app.listen(port, () => {
    console.log(`Ready to receive requests on ${port}`);
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, function() {
        console.log('Closing server');
        server.close(process.exit);
    });
});
