const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const SECRET_KEY = crypto.createHmac("sha256", process.env.PASS).digest("hex");

const generarToken = (usuario) => {
  return jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol.nombre },
      SECRET_KEY,
      { expiresIn: "1h" }
  );
};

module.exports = { generarToken };
