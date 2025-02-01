const Viaje = require('../models/Viaje');
const mongoose = require('mongoose');
const Sucursal = require('../models/Sucursal');
const Usuario = require('../models/Usuario');
const Hotel = require('../models/Hotel');
const Vuelo = require('../models/Vuelo');

exports.getViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find();
    res.json(viajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createViaje = async (req, res) => {
  try {
    const { sucursal, usuario, hotel, pensionHotel, vuelo, claseVuelo, fechaLlegada, fechaRetorno, precio } = req.body;
    
    const nuevoViaje = new Viaje({
      sucursal,
      usuario,
      hotel,
      pensionHotel,
      vuelo,
      claseVuelo,
      fechaLlegada,
      fechaRetorno,
      precio,
    });

    const viajeGuardado = await nuevoViaje.save();
    res.status(201).json(viajeGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createViajes = async (req, res) => {
  try {
    const viajes = req.body;

    if (!Array.isArray(viajes)) {
      return res.status(400).json({ message: 'Se esperaba un array de viajes' });
    }

    const viajesCreados = await Promise.all(
      viajes.map(async (viaje) => {
        // Validar datos requeridos
        if (!viaje.sucursal || !viaje.usuario || !viaje.fechaLlegada || !viaje.fechaRetorno || viaje.precio === undefined) {
          throw new Error('Los campos sucursal, usuario, fechaLlegada, fechaRetorno y precio son obligatorios');
        }

        // Crear el nuevo viaje
        const nuevoViaje = new Viaje({
          sucursal: viaje.sucursal,
          usuario: viaje.usuario,
          hotel: viaje.hotel || null,
          pensionHotel: viaje.pensionHotel || null,
          vuelo: viaje.vuelo || null,
          claseVuelo: viaje.claseVuelo || null,
          fechaLlegada: viaje.fechaLlegada,
          fechaRetorno: viaje.fechaRetorno,
          precio: viaje.precio,
        });

        // Guardar en la base de datos
        return await nuevoViaje.save();
      })
    );

    // Responder con los viajes creados
    res.status(201).json(viajesCreados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerViajePorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de viaje no válido' });
    }

    const viaje = await Viaje.findById(id);
    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    res.status(200).json(viaje);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el viaje: ' + error.message });
  }
};

exports.actualizarViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de viaje no válido' });
    }

    const viajeActualizado = await Viaje.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true, runValidators: true }
    );

    if (!viajeActualizado) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.status(200).json(viajeActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el viaje: ' + error.message });
  }
};

exports.eliminarViaje = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de viaje no válido' });
    }

    const viajeEliminado = await Viaje.findByIdAndDelete(id);
    if (!viajeEliminado) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.status(200).json({ message: 'Viaje eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el viaje: ' + error.message });
  }
};