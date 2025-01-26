package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.columbiaviajes.models.Venta;
import com.columbiaviajes.models.Usuario;
import com.columbiaviajes.models.Viaje;
import com.columbiaviajes.repositories.UsuarioRepository;
import com.columbiaviajes.repositories.VentaRepository;
import com.columbiaviajes.repositories.ViajeRepository;

@Service
public class VentaService {
    private final VentaRepository ventaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ViajeRepository viajeRepository;

    public VentaService(VentaRepository ventaRepository, UsuarioRepository usuarioRepository, ViajeRepository viajeRepository) {
        this.ventaRepository = ventaRepository;
        this.usuarioRepository = usuarioRepository;
        this.viajeRepository = viajeRepository;
    }

    public Venta crearVenta(Venta venta) {
        // Verificar si el Usuario existe
        Usuario vendedor = usuarioRepository.findById(venta.getVendedor().getId_usuario())
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + venta.getVendedor().getId_usuario()));

        // Verificar si el Viaje existe
        Viaje viaje = viajeRepository.findById(venta.getViaje().getId_viaje())
            .orElseThrow(() -> new IllegalArgumentException("Viaje no encontrado con ID: " + venta.getViaje().getId_viaje()));

        // Asignar las referencias encontradas
        venta.setVendedor(vendedor);
        venta.setViaje(viaje);

        // Guardar la venta
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
