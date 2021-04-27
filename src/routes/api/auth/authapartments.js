const router = require('express').Router();

const ApartmentController = require('../../../controllers/apartmentscontroller.js');

router.get('/lista', ApartmentController.list);
router.post('/actualizar', ApartmentController.find)
router.put('/actualizar', ApartmentController.update)

module.exports = router;