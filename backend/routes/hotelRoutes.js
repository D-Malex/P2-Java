const express = require('express');
const router = express.Router();
const hotelController= require('../controllers/hotelController');

router.get('', hotelController.getHoteles);

router.post('/new', hotelController.createHotel);
router.post('/news', hotelController.createHoteles);
router.get('/:ciudad', hotelController.obtenerHotelesPorCiudad);
router.put('/:id', hotelController.actualizarHotel);
router.get('/:id', hotelController.obtenerHotelPorId);
router.delete('/:id', hotelController.eliminarHotel);

module.exports = router;