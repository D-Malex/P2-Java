const Venta = require('../models/Venta');
const mongoose = require('mongoose');

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
    .populate({
      path: "vendedor",
      populate: {
        path: "rol",
      },
    })
    .populate({
      path: "viaje",
      populate: [
        { path: "sucursal" },
        { path: "hotel" },
        { path: "vuelo" },
        { path: "usuario", populate: "rol"}
      ]
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVentasDeUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    const ventas = await Venta.find({ vendedor: id })
      .populate({
        path: "vendedor",
        populate: { path: "rol" },
      })
      .populate({
        path: "viaje",
        populate: [
          { path: "sucursal" },
          { path: "hotel" },
          { path: "vuelo" },
          { path: "usuario", populate: "rol" },
        ],
      });

    if (ventas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ventas para este usuario' });
    }

    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas: ' + error.message });
  }
};

exports.createVenta = async (req, res) => {
  try {
    const { vendedor, viaje, fechaVenta } = req.body;

    const nuevaVenta = new Venta({
      vendedor,
      viaje,
      fechaVenta,
    });

    const ventaGuardada = await nuevaVenta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createVentas = async (req, res) => {
  try {
    const ventas = req.body;

    if (!Array.isArray(ventas)) {
      return res.status(400).json({ message: 'Se esperaba un array de ventas' });
    }

    const ventasCreadas = await Promise.all(
      ventas.map(async (venta) => {
        if (!venta.vendedor || !venta.viaje || !venta.fechaVenta) {
          throw new Error('Todos los campos (vendedor, viaje, fechaVenta) son obligatorios');
        }

        const nuevaVenta = new Venta({
          vendedor: venta.vendedor,
          viaje: venta.viaje,
          fechaVenta: venta.fechaVenta,
        });

        return await nuevaVenta.save();
      })
    );

    res.status(201).json(ventasCreadas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de venta no válido' });
    }

    const venta = await Venta.findById(id)
      .populate({
        path: "vendedor",
        populate: {
          path: "rol",
        },
      })
      .populate({
        path: "viaje",
        populate: [
          { path: "sucursal" },
          { path: "hotel" },
          { path: "vuelo" },
          { path: "usuario", populate: "rol"}
        ]
      });
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la venta: ' + error.message });
  }
};

exports.actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de venta no válido' });
    }

    const ventaActualizada = await Venta.findByIdAndUpdate(
      id,
      nuevosDatos,
      { new: true, runValidators: true }
    ).populate('vendedor').populate('viaje');

    if (!ventaActualizada) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.status(200).json(ventaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la venta: ' + error.message });
  }
};

exports.eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de venta no válido' });
    }

    const ventaEliminada = await Venta.findByIdAndDelete(id);
    if (!ventaEliminada) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.status(200).json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la venta: ' + error.message });
  }
};
