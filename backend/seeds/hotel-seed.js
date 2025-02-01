const { connectDB, disconnectDB } = require('../config/db');
const Hotel = require('../models/Hotel');

const hotelesIniciales = [
  {
    nombre: 'Hotel Paraíso',
    direccion: 'Avenida del Sol 123',
    ciudad: 'Buenos Aires',
    telefono: '1122334455',
    plazasDisponibles: 50,
  },
  {
    nombre: 'Hotel Laguna Azul',
    direccion: 'Calle del Mar 456',
    ciudad: 'Mar del Plata',
    telefono: '2233445566',
    plazasDisponibles: 30,
  },
  {
    nombre: 'Hotel Montaña',
    direccion: 'Ruta 40 Km 78',
    ciudad: 'Bariloche',
    telefono: '3344556677',
    plazasDisponibles: 40,
  },
];

const cargarHoteles = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Eliminar hoteles existentes (opcional)
    await Hotel.deleteMany({});

    // Insertar hoteles iniciales
    await Hotel.insertMany(hotelesIniciales);

    console.log('Hoteles cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los hoteles:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

cargarHoteles();
