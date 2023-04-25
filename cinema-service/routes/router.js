const Router = require('koa-router');
const cinemaController = require('./cinema');

const router = new Router();

router.get('/', async (ctx) => { ctx.body = 'Cinema service gateway' })

router.get('/manage/health', require('./healtcheck'));

const apiRouter = new Router({
    prefix: '/api/v1'
})
    .get('/cinema', cinemaController.list)
    .get('/cinema/:cinemaUid/films', cinemaController.films)
    .patch('/cinema/:cinemaUid/films/:filmUid/book-seat', cinemaController.bookSeat)

router.use(apiRouter.routes());

module.exports = router;
