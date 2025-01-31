const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  psw: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  id_sucursal: {// Referencia a Sucursal
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sucursal',
    default: null,
  },
  rol: {// Referencia a RoleEntity
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'RoleEntity',
    required: true,
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);