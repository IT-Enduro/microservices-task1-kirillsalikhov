const Router = require('koa-router');
const cinemaController = require('./cinema');
const filmSessionController = require('./filmSession');

const router = new Router();

router.get('/', async (ctx) => { ctx.body = 'Cinema service gateway' })

router.get('/manage/health', require('./healtcheck'));

const apiRouter = new Router({
    prefix: '/api/v1'
})
    .get('/cinema', cinemaController.list)
    .get('/cinema/:cinemaUid/films', cinemaController.films)
    // TODO move to sessionController ?
    .patch('/cinema/:cinemaUid/films/:filmUid/book-seat', cinemaController.bookSeat)
    .patch('/film-sessions/:sessionUid/release-seat', filmSessionController.releaseSeat)


router.use(apiRouter.routes());

module.exports = router;
