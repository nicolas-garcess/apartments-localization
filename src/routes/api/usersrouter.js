const router = require('express').Router();

const UserController = require('../../controllers/usercontroller.js');


router.post('/sigin', UserController.sigin);
router.post('/signup', UserController.signup);

module.exports = router;