const Koa = require('koa');

const router = require('./routes/router');

const port = 8070;

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
