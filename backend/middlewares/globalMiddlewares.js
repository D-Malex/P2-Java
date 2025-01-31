const cors = require('cors');
const bodyParser = require('body-parser');

const globalMiddlewares = (app) => {
  // Middleware para habilitar CORS
  app.use(cors());

  // Middleware para parsear el cuerpo de las solicitudes a JSON
  app.use(bodyParser.json());
};

module.exports = globalMiddlewares;