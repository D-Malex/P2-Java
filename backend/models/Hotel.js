const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  plazasDisponibles: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Hotel', HotelSchema);