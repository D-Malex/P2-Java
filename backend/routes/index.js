const express = require('express');
const router = express.Router();

// Importar rutas sectorizadas
const usuariosRoutes = require('./usuariosRoutes');

// Usar las rutas sectorizadas
router.use('/usuarios', usuariosRoutes);

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Columbia Viajes');
});


module.exports = router;