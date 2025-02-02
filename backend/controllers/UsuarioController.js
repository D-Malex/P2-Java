const RoleEntity = require('../models/RoleEntity');
const Sucursal = require('../models/Sucursal');
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate('rol', 'nombre') // Incluir solo el campo 'nombre' del rol
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, psw, direccion, telefono, rol, id_sucursal } = req.body;

    // Extraer el id_rol del objeto "rol"
    const idRol = rol.id_rol;

    // Validar que el ID del rol sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(idRol)) {
      return res.status(400).json({ message: 'ID de rol no válido' });
    }

    // Verificar si el rol existe
    const rolExistente = await RoleEntity.findById(idRol);
    if (!rolExistente) {
      return res.status(400).json({ message: 'El rol especificado no existe' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      psw,
      direccion,
      telefono,
      rol: idRol, // Usar el ObjectId directamente
      id_sucursal,
    });

    // Guardar el usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();

    // Responder con el usuario creado
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createUsuarios = async (req, res) => {
  try {
    const usuarios = req.body;

    if (!Array.isArray(usuarios)) {
      return res.status(400).json({ message: 'Se esperaba un array de usuarios' });
    }

    const usuariosCreados = await Promise.all(
      usuarios.map(async (usuario) => {
        // Extraer el id_rol del objeto "rol"
        const idRol = usuario.rol.id_rol;

        // Validar que el ID del rol sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idRol)) {
          throw new Error('ID de rol no válido');
        }

        // Validar que el ID de la sucursal sea un ObjectId válido (si se proporciona)
        if (usuario.id_sucursal && !mongoose.Types.ObjectId.isValid(usuario.id_sucursal)) {
          throw new Error('ID de sucursal no válido');
        }

        // Verificar si el rol existe
        const rolExistente = await RoleEntity.findById(idRol);
        if (!rolExistente) {
          throw new Error('El rol especificado no existe');
        }

        // Verificar si la sucursal existe (si se proporciona)
        if (usuario.id_sucursal) {
          const sucursalExistente = await Sucursal.findById(usuario.id_sucursal);
          if (!sucursalExistente) {
            throw new Error('La sucursal especificada no existe');
          }
        }

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          psw: usuario.psw,
          direccion: usuario.direccion,
          telefono: usuario.telefono,
          rol: idRol, // Usar el ObjectId directamente
          id_sucursal: usuario.id_sucursal, // Puede ser null
        });

        // Guardar el usuario en la base de datos
        return await nuevoUsuario.save();
      })
    );

    // Responder con los usuarios creados
    res.status(201).json(usuariosCreados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const nuevosDatos = req.body;

    // Validar que el rol y la sucursal sean ObjectId válidos
    if (nuevosDatos.rol && !mongoose.Types.ObjectId.isValid(nuevosDatos.rol._id)) {
      return res.status(400).json({ message: 'ID de rol no válido' });
    }
    if (nuevosDatos.id_sucursal && !mongoose.Types.ObjectId.isValid(nuevosDatos.id_sucursal)) {
      return res.status(400).json({ message: 'ID de sucursal no válido' });
    }

    // Verificar si el usuario es vendedor y tiene sucursal asignada
    if (nuevosDatos.rol.nombre === 'VENDEDOR' && !nuevosDatos.id_sucursal) {
      return res.status(400).json({ message: 'El vendedor debe tener una sucursal asignada.' });
    }

    // Buscar y actualizar el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      nuevosDatos._id,
      nuevosDatos,
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario: ' + error.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id)
    .populate('rol', 'nombre') // Incluir solo el campo 'nombre' del rol;

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario: ' + error.message });
  }
};

exports.obtenerUsuariosPorRol = async (req, res) => {
  try {
    const { id_rol } = req.params;

    const usuarios = await Usuario.find({ rol: id_rol })
    .populate('rol', 'nombre') // Incluir solo el campo 'nombre' del rol;

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios con ese rol' });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios por rol: ' + error.message });
  }
};

exports.obtenerUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const usuario = await Usuario.findOne({ email })
    .populate('rol', 'nombre') // Incluir solo el campo 'nombre' del rol;

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario por email: ' + error.message });
  }
};

exports.obtenerEmails = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { email: 1, _id: 0 }); // Solo obtener el campo email
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }

    const emails = usuarios.map((usuario) => usuario.email);
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error en obtenerEmails:', error);
    res.status(500).json({ message: 'Error al obtener los emails: ' + error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario: ' + error.message });
  }
};