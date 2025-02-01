const cors = require('cors');
const bodyParser = require('body-parser');

const globalMiddlewares = (app) => {
  // Configurar CORS con opciones específicas
  const corsOptions = {
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true,
  };
  
  // Middleware para habilitar CORS
  app.use(cors(corsOptions));
  
  // Middleware para parsear el cuerpo de las solicitudes a JSON
  app.use(bodyParser.json());
};

module.exports = globalMiddlewares;