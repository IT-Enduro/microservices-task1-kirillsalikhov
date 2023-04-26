const Router = require('koa-router');
const ticketsController = require("./tickets");

const router = new Router();

router.get('/', async (ctx) => { ctx.body = 'Tickets service gateway' })

router.get('/manage/health', require('./healtcheck'));

const apiRouter = new Router({
    prefix: '/api/v1'
})
    .get('ticketUid', '/tickets/:ticketUid', ticketsController.show)
    .post('/tickets/cinema/:cinemaUid/films/:filmUid', ticketsController.buyTicket);

router.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;
