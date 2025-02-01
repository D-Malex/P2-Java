const Hotel = require('../models/Hotel');
const mongoose = require('mongoose');

exports.getHoteles = async (req, res) => {
  try {
    const hoteles = await Hotel.find();
    res.json(hoteles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const { nombre, direccion, ciudad, telefono, plazasDisponibles } = req.body;

    const nuevoHotel = new Hotel({
      nombre,
      direccion,
      ciudad,
      telefono,
      plazasDisponibles,
    });

    const hotelGuardado = await nuevoHotel.save();
    res.status(201).json(hotelGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createHoteles = async (req, res) => {
  try {
    const hoteles = req.body;

    if (!Array.isArray(hoteles)) {
      return res.status(400).json({ message: 'Se esperaba un array de hoteles' });
    }

    const hotelesCreados = await Promise.all(
      hoteles.map(async (hotel) => {
        // Validar datos requeridos
        if (!hotel.nombre || !hotel.direccion || !hotel.ciudad || !hotel.telefono || hotel.plazasDisponibles === undefined) {
          throw new Error('Todos los campos (nombre, dirección, ciudad, teléfono, plazasDisponibles) son obligatorios');
        }

        // Verificar si el hotel ya existe por nombre y dirección
        const hotelExistente = await Hotel.findOne({ nombre: hotel.nombre, direccion: hotel.direccion });
        if (hotelExistente) {
          throw new Error(`Ya existe un hotel con el nombre y dirección: ${hotel.nombre} - ${hotel.direccion}`);
        }

        // Crear el nuevo hotel
        const nuevoHotel = new Hotel({
          nombre: hotel.nombre,
          direccion: hotel.direccion,
          ciudad: hotel.ciudad,
          telefono: hotel.telefono,
          plazasDisponibles: hotel.plazasDisponibles,
        });

        // Guardar en la base de datos
        return await nuevoHotel.save();
      })
    );

    // Responder con los hoteles creados
    res.status(201).json(hotelesCreados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerHotelPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de hotel no válido' });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }
    
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el hotel: ' + error.message });
  }
};

exports.actualizarHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de hotel no válido' });
    }

    const hotelActualizado = await Hotel.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true, runValidators: true }
    );

    if (!hotelActualizado) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }

    res.status(200).json(hotelActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el hotel: ' + error.message });
  }
};

exports.eliminarHotel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de hotel no válido' });
    }

    const hotelEliminado = await Hotel.findByIdAndDelete(id);
    if (!hotelEliminado) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }

    res.status(200).json({ message: 'Hotel eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el hotel: ' + error.message });
  }
};
