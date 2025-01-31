const Usuario = require('../models/Usuario');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  try {
    const savedUsuario = await usuario.save();
    res.status(201).json(savedUsuario);
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
        const nuevoUsuario = new Usuario(usuario);
        return await nuevoUsuario.save();
      })
    );

    res.status(201).json(usuariosCreados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    // Verificar si el usuario es vendedor y tiene sucursal asignada
    if (nuevosDatos.rol === 'VENDEDOR' && !nuevosDatos.id_sucursal) {
      return res.status(400).json({ message: 'El vendedor debe tener una sucursal asignada.' });
    }

    // Buscar y actualizar el usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
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

    const usuario = await Usuario.findById(id);
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

    const usuarios = await Usuario.find({ rol: id_rol });
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

    const usuario = await Usuario.findOne({ email });
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
    const emails = usuarios.map((usuario) => usuario.email);

    res.status(200).json(emails);
  } catch (error) {
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