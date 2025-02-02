const express = require('express');
const router = express.Router();
const ventaController= require('../controllers/ventaController');

router.get('', ventaController.getVentas);
router.get('/usuario/:id', ventaController.getVentasDeUsuario);
router.post('/new', ventaController.createVenta);
router.post('/news', ventaController.createVentas);
router.put('/:id', ventaController.actualizarVenta);
router.get('/:id', ventaController.obtenerVentaPorId);
router.delete('/:id', ventaController.eliminarVenta);

module.exports = router;