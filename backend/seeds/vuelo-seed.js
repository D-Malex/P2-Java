const { connectDB, disconnectDB } = require('../config/db');
const Vuelo = require('../models/Vuelo');

const vuelosIniciales = [
  {
    fecha: new Date('2024-02-10'),
    hora: '08:30',
    origen: 'Buenos Aires',
    destino: 'Bariloche',
    plazasTotales: 180,
    plazasTurista: 150,
  },
  {
    fecha: new Date('2024-02-15'),
    hora: '14:45',
    origen: 'Córdoba',
    destino: 'Mendoza',
    plazasTotales: 120,
    plazasTurista: 100,
  },
  {
    fecha: new Date('2024-02-20'),
    hora: '19:00',
    origen: 'Rosario',
    destino: 'Salta',
    plazasTotales: 200,
    plazasTurista: 180,
  },
  {
    fecha: new Date('2024-02-25'),
    hora: '06:15',
    origen: 'Mendoza',
    destino: 'Ushuaia',
    plazasTotales: 160,
    plazasTurista: 140,
  },
];

const cargarVuelos = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Eliminar vuelos existentes (opcional)
    await Vuelo.deleteMany({});

    // Insertar vuelos iniciales
    await Vuelo.insertMany(vuelosIniciales);

    console.log('Vuelos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los vuelos:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

cargarVuelos();
