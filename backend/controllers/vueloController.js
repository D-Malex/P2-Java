const Vuelo = require('../models/Vuelo');
const mongoose = require('mongoose');

exports.getVuelos = async (req, res) => {
  try {
    const vuelos = await Vuelo.find();
    res.json(vuelos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createVuelo = async (req, res) => {
  try {
    const { fecha, hora, origen, destino, plazasTotales, plazasTurista } = req.body;

    const nuevoVuelo = new Vuelo({
      fecha,
      hora,
      origen,
      destino,
      plazasTotales,
      plazasTurista,
    });

    const vueloGuardado = await nuevoVuelo.save();
    res.status(201).json(vueloGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createVuelos = async (req, res) => {
  try {
    const vuelos = req.body;

    if (!Array.isArray(vuelos)) {
      return res.status(400).json({ message: 'Se esperaba un array de vuelos' });
    }

    const vuelosCreados = await Promise.all(
      vuelos.map(async (vuelo) => {
        if (!vuelo.fecha || !vuelo.hora || !vuelo.origen || !vuelo.destino || vuelo.plazasTotales === undefined || vuelo.plazasTurista === undefined) {
          throw new Error('Todos los campos (fecha, hora, origen, destino, plazasTotales, plazasTurista) son obligatorios');
        }

        const nuevoVuelo = new Vuelo(vuelo);
        return await nuevoVuelo.save();
      })
    );

    res.status(201).json(vuelosCreados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerVueloPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de vuelo no válido' });
    }

    const vuelo = await Vuelo.findById(id);
    if (!vuelo) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }
    
    res.status(200).json(vuelo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el vuelo: ' + error.message });
  }
};

exports.actualizarVuelo = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de vuelo no válido' });
    }

    const vueloActualizado = await Vuelo.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true, runValidators: true }
    );

    if (!vueloActualizado) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    res.status(200).json(vueloActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el vuelo: ' + error.message });
  }
};

exports.eliminarVuelo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de vuelo no válido' });
    }

    const vueloEliminado = await Vuelo.findByIdAndDelete(id);
    if (!vueloEliminado) {
      return res.status(404).json({ message: 'Vuelo no encontrado' });
    }

    res.status(200).json({ message: 'Vuelo eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vuelo: ' + error.message });
  }
};
