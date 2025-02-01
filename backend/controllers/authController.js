const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { generarToken } = require("../config/jwt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la BD
    const usuario = await Usuario.findOne({ email }).populate('rol');
    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    // Validar contraseña
    if (usuario.psw !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = generarToken(usuario);

    res.json({ token, usuario, message: "Autenticación exitosa" });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { login };
