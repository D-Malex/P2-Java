package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.columbiaviajes.models.Viaje;
import com.columbiaviajes.repositories.ViajeRepository;

@Service
public class ViajeService {
  private final ViajeRepository viajeRepository;

  public ViajeService(ViajeRepository viajeRepository) {
      this.viajeRepository = viajeRepository;
  }

  public Viaje crearViaje(Viaje viaje) {
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
