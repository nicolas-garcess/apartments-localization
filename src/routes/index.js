const router = require('express').Router();
const apartmentsRouter = require('./api/apartmentsrouter');
const viewsRouter = require('./api/viewsrouter');
const usersRouter = require('./api/usersrouter');

router.use('/apartamentos', apartmentsRouter);
router.use('/', viewsRouter);
router.use('/usuarios', usersRouter);

module.exports = router;