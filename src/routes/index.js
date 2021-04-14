const router = require('express').Router();
const apartmentsRouter = require('./api/apartmentsrouter');


//const controller = require('../controllers');
//router.get('/', controller.index);
router.use('/apartamentos', apartmentsRouter);


module.exports = router;