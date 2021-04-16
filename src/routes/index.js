const router = require('express').Router();
const apartmentsRouter = require('./api/apartmentsrouter');

router.use('/apartamentos', apartmentsRouter);

module.exports = router;