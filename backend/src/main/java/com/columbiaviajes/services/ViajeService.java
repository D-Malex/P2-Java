package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.models.Sucursal;
import com.columbiaviajes.models.Usuario;
import com.columbiaviajes.models.Viaje;
import com.columbiaviajes.models.Vuelo;
import com.columbiaviajes.repositories.HotelRepository;
import com.columbiaviajes.repositories.SucursalRepository;
import com.columbiaviajes.repositories.UsuarioRepository;
import com.columbiaviajes.repositories.ViajeRepository;
import com.columbiaviajes.repositories.VueloRepository;

@Service
public class ViajeService {
    private final ViajeRepository viajeRepository;
    private final HotelRepository hotelRepository;
    private final SucursalRepository sucursalRepository;
    private final UsuarioRepository usuarioRepository;
    private final VueloRepository vueloRepository;

  public ViajeService(
            ViajeRepository viajeRepository,
            HotelRepository hotelRepository,
            SucursalRepository sucursalRepository,
            UsuarioRepository usuarioRepository,
            VueloRepository vueloRepository
    ) {
        this.viajeRepository = viajeRepository;
        this.hotelRepository = hotelRepository;
        this.sucursalRepository = sucursalRepository;
        this.usuarioRepository = usuarioRepository;
        this.vueloRepository = vueloRepository;
    }

  public Viaje crearViaje(Viaje viaje) {
    // Carga las entidades relacionadas desde la base de datos
    Hotel hotel = hotelRepository.findById(viaje.getHotel().getId_hotel())
            .orElseThrow(() -> new IllegalArgumentException("Hotel no encontrado."));
    Sucursal sucursal = sucursalRepository.findById(viaje.getSucursal().getId_sucursal())
            .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada."));
    Usuario usuario = usuarioRepository.findById(viaje.getUsuario().getId_usuario())
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."));
    Vuelo vuelo = vueloRepository.findById(viaje.getVuelo().getId_vuelo())
            .orElseThrow(() -> new IllegalArgumentException("Vuelo no encontrado."));

    // Asigna las entidades al viaje
    viaje.setHotel(hotel);
    viaje.setSucursal(sucursal);
    viaje.setUsuario(usuario);
    viaje.setVuelo(vuelo);

    // Guarda el viaje en la base de datos
    return viajeRepository.save(viaje);
  }


  public List<Viaje> obtenerViajes() {
      return (List<Viaje>) viajeRepository.obtenerViajesOrdenados();
  }

  public Optional<Viaje> buscarPorId(Long id) {
      return viajeRepository.findById(id);
  }

  public void eliminarViaje(Long id) {
      viajeRepository.deleteById(id);
  }
}
