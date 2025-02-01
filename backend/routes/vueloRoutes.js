const express = require('express');
const router = express.Router();
const vueloController= require('../controllers/vueloController');

router.get('', vueloController.getVuelos);
router.post('/new', vueloController.createVuelo);
router.post('/news', vueloController.createVuelos);
router.put('/:id', vueloController.actualizarVuelo);
router.get('/:id', vueloController.obtenerVueloPorId);
router.delete('/:id', vueloController.eliminarVuelo);

module.exports = router;