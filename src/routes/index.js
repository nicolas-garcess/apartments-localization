const router = require('express').Router();
const apartmentsRouter = require('./api/apartmentsrouter');
const viewsRouter = require('./api/viewsrouter');

router.use('/apartamentos', apartmentsRouter);
router.use('/', viewsRouter)

module.exports = router;