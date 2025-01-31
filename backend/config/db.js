const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/columbia-viajes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;