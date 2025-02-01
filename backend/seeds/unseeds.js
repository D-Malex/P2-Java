const { connectDB, disconnectDB } = require('../config/db');
const Sucursal = require('../models/Sucursal');
const Usuario = require('../models/Usuario');
const Hotel = require('../models/Hotel');
const Vuelo = require('../models/Vuelo');
const Venta = require('../models/Venta');
const Viaje = require('../models/Viaje');

const descargarBaseDatos = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    await Hotel.deleteMany({});
    await Sucursal.deleteMany({});
    await Usuario.deleteMany({});
    await Vuelo.deleteMany({});

    console.log('BaseDatos eliminados exitosamente');
  } catch (error) {
    console.error('Error al eliminar los BaseDatos:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

descargarBaseDatos();