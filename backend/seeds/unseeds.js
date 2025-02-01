const { connectDB, disconnectDB } = require('../config/db');
const Sucursal = require('../models/Sucursal');
const Usuario = require('../models/Usuario');
const Hotel = require('../models/Hotel');
const Vuelo = require('../models/Vuelo');

const descargarHoteles = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    await Hotel.deleteMany({});
    await Sucursal.deleteMany({});
    await Usuario.deleteMany({});
    await Vuelo.deleteMany({});

    console.log('Hoteles eliminados exitosamente');
  } catch (error) {
    console.error('Error al eliminar los hoteles:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

descargarHoteles();