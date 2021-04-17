const router = require('express').Router();

const ApartmentController = require('../../controllers/apartmentscontroller.js');


router.get('/buscar', ApartmentController.search);
router.get('/procesar', ApartmentController.process);
router.get('/exportar', ApartmentController.exportsFile);

module.exports = router;