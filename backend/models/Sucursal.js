const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  direccion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Sucursales', SucursalSchema);