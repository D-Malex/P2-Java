const { connectDB, disconnectDB } = require('../config/db');
const Sucursal = require('../models/Sucursal');

const sucursalesIniciales = [
  {
    direccion: 'Calle Falsa 123',
    email: 'sucursal1@example.com',
    telefono: '1234567890',
  },
  {
    direccion: 'Avenida Siempre Viva 456',
    email: 'sucursal2@example.com',
    telefono: '0987654321',
  },
  {
    direccion: 'Boulevard de los Sueños Rotos 789',
    email: 'sucursal3@example.com',
    telefono: '5555555555',
  },
];

const cargarSucursales = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Eliminar sucursales existentes (opcional)
    await Sucursal.deleteMany({});

    // Insertar sucursales iniciales
    await Sucursal.insertMany(sucursalesIniciales);

    console.log('Sucursales cargadas exitosamente');
  } catch (error) {
    console.error('Error al cargar las sucursales:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

cargarSucursales();