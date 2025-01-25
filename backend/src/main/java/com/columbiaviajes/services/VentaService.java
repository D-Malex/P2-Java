package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.columbiaviajes.models.Venta;
import com.columbiaviajes.repositories.VentaRepository;

@Service
public class VentaService {
  private final VentaRepository ventaRepository;

  public VentaService(VentaRepository ventaRepository) {
      this.ventaRepository = ventaRepository;
  }

  public Venta crearVenta(Venta venta) {
      return ventaRepository.save(venta);
  }

  public List<Venta> obtenerVentas() {
      return (List<Venta>) ventaRepository.findAll();
  }

  public Optional<Venta> buscarPorId(Long id) {
      return ventaRepository.findById(id);
  }

  // Método para buscar ventas por ID de usuario
  public List<Venta> obtenerVentasPorUsuario(Long id_usuario) {
      return (List<Venta>) ventaRepository.buscarVentasPorUsuario(id_usuario);
  }

  public void eliminarVenta(Long id) {
    ventaRepository.deleteById(id);
  }
}
