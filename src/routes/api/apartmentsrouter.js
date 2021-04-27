const router = require('express').Router();

const ApartmentController = require('../../controllers/apartmentscontroller.js');
const authApartments = require('./auth/authapartments.js');

router.get('/buscar', ApartmentController.search);
router.get('/procesar', ApartmentController.process);
router.post('/exportar', ApartmentController.exportsFile);
router.put('/actualizar', ApartmentController.update);

router.use('/auth', authApartments);

module.exports = router;