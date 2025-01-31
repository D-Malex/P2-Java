const { connectDB, disconnectDB } = require('../config/db');
const RoleEntity = require('../models/RoleEntity');

const rolesIniciales = [
  { nombre: 'DUENIO' },
  { nombre: 'ADMINISTRADOR' },
  { nombre: 'VENDEDOR' },
  { nombre: 'TURISTA' },
];

const cargarRoles = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Eliminar roles existentes
    await RoleEntity.deleteMany({});

    // Insertar roles iniciales
    await RoleEntity.insertMany(rolesIniciales);

    console.log('Roles cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los roles:', error);
  } finally {
    await disconnectDB();
  }
};

cargarRoles();