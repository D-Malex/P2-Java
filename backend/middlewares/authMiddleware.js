const authMiddleware = (req, res, next) => {
  // Lógica de autenticación
  console.log('Middleware de autenticación ejecutado');
  next();
};

module.exports = authMiddleware;