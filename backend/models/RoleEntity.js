const mongoose = require('mongoose');

const RoleEntitySchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: ['DUENIO', 'ADMINISTRADOR', 'VENDEDOR', 'TURISTA'],
    required: true,
  },
});

module.exports = mongoose.model('RoleEntity', RoleEntitySchema);