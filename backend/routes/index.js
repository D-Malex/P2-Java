const express = require('express');
const router = express.Router();

// Importar rutas sectorizadas
const usuarioRoutes = require('./usuarioRoutes');
const sucursalRoutes = require('./sucursalRoutes');
const hotelRoutes = require('./hotelRoutes');
const vueloRoutes = require('./vueloRoutes');

// Usar las rutas sectorizadas
router.use('/usuarios', usuarioRoutes);
router.use('/sucursales', sucursalRoutes);
router.use('/hoteles', hotelRoutes);
router.use('/vuelos', vueloRoutes);

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Columbia Viajes');
});


module.exports = router;