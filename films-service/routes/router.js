const Router = require('koa-router');
const filmsController = require('./film');

const router = new Router();

router.get('/', async (ctx) => { ctx.body = 'Films service gateway' })

router.get('/manage/health', require('./healtcheck'));

const apiRouter = new Router({
    prefix: '/api/v1'
})
    .get('/films', filmsController.list)

router.use(apiRouter.routes());

module.exports = router;
