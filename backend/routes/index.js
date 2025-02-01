const express = require('express');
const router = express.Router();

// Importar rutas sectorizadas
const usuarioRoutes = require('./usuarioRoutes');

// Usar las rutas sectorizadas
router.use('/usuarios', usuarioRoutes);

router.get('/', (req, res) => {
  res.send('Bienvenido a la API de Columbia Viajes');
});


module.exports = router;