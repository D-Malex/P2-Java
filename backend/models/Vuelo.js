const mongoose = require('mongoose');

const VueloSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String, //"HH:mm"
    required: true,
  },
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  plazasTotales: {
    type: Number,
    required: true,
  },
  plazasTurista: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Vuelo', VueloSchema);