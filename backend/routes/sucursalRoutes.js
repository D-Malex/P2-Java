const express = require('express');
const router = express.Router();
const sucursalController= require('../controllers/sucursalController');

router.get('', sucursalController.getSucursales);
router.post('/new', sucursalController.createSucursal);
router.post('/news', sucursalController.createSucursales);
router.put('/:id', sucursalController.actualizarSucursal);
router.get('/:id', sucursalController.obtenerSucursalPorId);
router.delete('/:id', sucursalController.eliminarSucursal);

module.exports = router;