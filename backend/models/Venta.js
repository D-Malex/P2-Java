const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  vendedor: {// Referencia a Usuario
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    required: true,
  },
  viaje: {// Referencia a Viaje
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Viaje',
    required: true,
  },
  fechaVenta: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Venta', VentaSchema);