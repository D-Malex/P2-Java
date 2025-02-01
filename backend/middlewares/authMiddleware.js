const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.PASS || "secreto_super_seguro";

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado. Token requerido." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = verifyToken;