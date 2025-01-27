package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.columbiaviajes.models.Vuelo;
import com.columbiaviajes.repositories.VueloRepository;

@Service
public class VueloService {
  private final VueloRepository vueloRepository;

  public VueloService(VueloRepository vueloRepository) {
      this.vueloRepository = vueloRepository;
  }

  public Vuelo crearVuelo(Vuelo vuelo) {
      return vueloRepository.save(vuelo);
  }

  public Vuelo actualizarVuelo(Vuelo vuelo) {
    if (vueloRepository.existsById(vuelo.getId_vuelo())) {
        return vueloRepository.save(vuelo);
    }
    throw new IllegalArgumentException("Vuelo no encontrada con ID: " + vuelo.getId_vuelo());
  }

  public List<Vuelo> obtenerVuelos() {
      return (List<Vuelo>) vueloRepository.findAll();
  }

  public Optional<Vuelo> buscarPorId(Long id) {
      return vueloRepository.findById(id);
  }

  public void eliminarVuelo(Long id) {
      vueloRepository.deleteById(id);
  }
}
