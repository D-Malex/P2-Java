package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.columbiaviajes.models.Sucursal;
import com.columbiaviajes.repositories.SucursalRepository;

@Service
public class SucursalService {
  private final SucursalRepository sucursalRepository;

  public SucursalService(SucursalRepository sucursalRepository) {
      this.sucursalRepository = sucursalRepository;
  }

  public Sucursal crearSucursal(Sucursal sucursal) {
      return sucursalRepository.save(sucursal);
  }
  
  public Sucursal actualizarSucursal(Sucursal sucursal) {
    if (sucursalRepository.existsById(sucursal.getId_sucursal())) {
        return sucursalRepository.save(sucursal);
    }
    throw new IllegalArgumentException("Sucursal no encontrada con ID: " + sucursal.getId_sucursal());
  }

  public List<Sucursal> obtenerSucursales() {
      return (List<Sucursal>) sucursalRepository.findAll();
  }

  public Optional<Sucursal> buscarPorId(Long id) {
      return sucursalRepository.findById(id);
  }

  public void eliminarSucursal(Long id) {
      sucursalRepository.deleteById(id);
  }
}
