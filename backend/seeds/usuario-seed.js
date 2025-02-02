const { connectDB, disconnectDB } = require('../config/db');
const Usuario = require('../models/Usuario');
const RoleEntity = require('../models/RoleEntity');

const cargarUsuarios = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener los roles
    const duenio = await RoleEntity.findOne({ nombre: 'DUENIO' });
    const administrador = await RoleEntity.findOne({ nombre: 'ADMINISTRADOR' });
    const vendedor = await RoleEntity.findOne({ nombre: 'VENDEDOR' });
    const turista = await RoleEntity.findOne({ nombre: 'TURISTA' });

    if (!duenio || !administrador || !vendedor || !turista) {
      throw new Error('No se encontraron todos los roles necesarios.');
    }

    // Eliminar usuarios existentes (opcional)
    await Usuario.deleteMany({});

    // Insertar usuarios
    await Usuario.insertMany([
      {
        nombre: 'Matias',
        apellido: 'Seba Mallo',
        email: 'madev@gmail.com',
        psw: '1234',
        direccion: 'Acala vuelta 123',
        telefono: '12345678',
        id_sucursal: null,
        rol: duenio._id,
      },
      {
        nombre: 'Carolina',
        apellido: 'Rombolá',
        email: 'caro@gmail.com',
        psw: '1234',
        direccion: 'Nlaotra Cuadra 123',
        telefono: '12345678',
        id_sucursal: null,
        rol: administrador._id,
      },
      {
        nombre: 'Lilia',
        apellido: 'Mallo',
        email: 'lili@gmail.com',
        psw: '1234',
        direccion: 'Po raca 123',
        telefono: '12345678',
        id_sucursal: "679efed38e3326d5e84accd5", 
        rol: vendedor._id,
      },
      {
        nombre: 'Zulma',
        apellido: 'Acosta',
        email: 'zulmi@gmail.com',
        psw: '1234',
        direccion: 'Puesdon Demas 123',
        telefono: '12345678',
        id_sucursal: null,
        rol: turista._id,
      },
    ]);

    console.log('Usuarios cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await disconnectDB();
  }
};

cargarUsuarios();
