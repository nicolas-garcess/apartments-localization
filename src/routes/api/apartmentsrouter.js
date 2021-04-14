const router = require('express').Router();

const controller = require('../../controllers/apartmentscontroller.js');
//const userVerification = require('../../middlewares/auth')

router.get('/', controller.services);

module.exports = router;