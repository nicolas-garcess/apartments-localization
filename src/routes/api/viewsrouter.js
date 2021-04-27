const router = require('express').Router();

const ViewController = require('../../controllers/viewscontroller');


router.get('/', ViewController.index);
router.get('/buscar-precio-habitacion', ViewController.search);
router.get('/buscar-locacion', ViewController.location);

module.exports = router;