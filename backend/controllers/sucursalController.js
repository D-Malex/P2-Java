const Sucursal = require('../models/Sucursal');
const mongoose = require('mongoose');

exports.getSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSucursal = async (req, res) => {
  try {
    const { direccion, email, telefono } = req.body;

    const nuevaSucursal = new Sucursal({
      direccion,
      email,
      telefono,
    });

    const sucursalGuardada = await nuevaSucursal.save();
    res.status(201).json(sucursalGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createSucursales = async (req, res) => {
  try {
    const sucursales = req.body;

    if (!Array.isArray(sucursales)) {
      return res.status(400).json({ message: 'Se esperaba un array de sucursales' });
    }

    const sucursalesCreadas = await Promise.all(
      sucursales.map(async (sucursal) => {
        // Validar datos requeridos
        if (!sucursal.direccion || !sucursal.email || !sucursal.telefono) {
          throw new Error('Todos los campos (dirección, email, teléfono) son obligatorios');
        }

        // Verificar si el email ya existe
        const sucursalExistente = await Sucursal.findOne({ email: sucursal.email });
        if (sucursalExistente) {
          throw new Error(`Ya existe una sucursal con el email: ${sucursal.email}`);
        }

        // Crear la nueva sucursal
        const nuevaSucursal = new Sucursal({
          direccion: sucursal.direccion,
          email: sucursal.email,
          telefono: sucursal.telefono,
        });

        // Guardar en la base de datos
        return await nuevaSucursal.save();
      })
    );

    // Responder con las sucursales creadas
    res.status(201).json(sucursalesCreadas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerSucursalPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sucursal no válido' });
    }

    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }
    
    res.status(200).json(sucursal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la sucursal: ' + error.message });
  }
};

exports.actualizarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sucursal no válido' });
    }

    const sucursalActualizada = await Sucursal.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true, runValidators: true }
    );

    if (!sucursalActualizada) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.status(200).json(sucursalActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la sucursal: ' + error.message });
  }
};

exports.eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de sucursal no válido' });
    }

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
    if (!sucursalEliminada) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    res.status(200).json({ message: 'Sucursal eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la sucursal: ' + error.message });
  }
};
