const express = require('express');
const router = express.Router();

// Importar rutas sectorizadas
const usuarioRoutes = require('./usuarioRoutes');
const sucursalRoutes = require('./sucursalRoutes');
const hotelRoutes = require('./hotelRoutes');
const vueloRoutes = require('./vueloRoutes');
const viajeRoutes = require('./viajeRoutes');
const ventaRoutes = require('./ventaRoutes');

// Usar las rutas sectorizadas
router.use('/usuarios', usuarioRoutes);
router.use('/sucursales', sucursalRoutes);
router.use('/hoteles', hotelRoutes);
router.use('/vuelos', vueloRoutes);
router.use('/viajes', viajeRoutes);
router.use('/ventas', ventaRoutes);

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Columbia Viajes');
});


module.exports = router;