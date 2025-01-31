const express = require('express');
const connectDB = require('./config/db');
const globalMiddlewares = require('./middlewares/globalMiddlewares');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Cargar middlewares globales
globalMiddlewares(app);

// Cargo las rutas
app.use('/api', router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});