const mongoose = require('mongoose');

const ViajeSchema = new mongoose.Schema({
  sucursal: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sucursal',
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel',
  },
  pensionHotel: {
    type: String,
  },
  vuelo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vuelo',
  },
  claseVuelo: {
    type: String,
  },
  fechaLlegada: {
    type: Date,
    required: true,
  },
  fechaRetorno: {
    type: Date,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Viaje', ViajeSchema);