const express = require('express');
const router = express.Router();
const viajeController= require('../controllers/viajeController');

router.get('', viajeController.getViajes);
router.post('/new', viajeController.createViaje);
router.post('/news', viajeController.createViajes);
router.put('/:id', viajeController.actualizarViaje);
router.get('/:id', viajeController.obtenerViajePorId);
router.delete('/:id', viajeController.eliminarViaje);

module.exports = router;