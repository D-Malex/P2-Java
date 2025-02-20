package com.columbiaviajes.services;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.repositories.HotelRepository;

@Service
public class HotelService {
  private final HotelRepository hotelRepository;

  public HotelService(HotelRepository hotelRepository) {
      this.hotelRepository = hotelRepository;
  }

  public Hotel crearHotel(Hotel hotel) {
      return hotelRepository.save(hotel);
  }

  public Hotel actualizarHotel(Hotel hotel) {
    if (hotelRepository.existsById(hotel.getId_hotel())) {
        return hotelRepository.save(hotel);
    }
    throw new IllegalArgumentException("Hotel no encontrada con ID: " + hotel.getId_hotel());
  }

  public List<Hotel> obtenerHoteles() {
      return (List<Hotel>) hotelRepository.findAll();
  }

  public Optional<Hotel> buscarPorId(Long id) {
      return hotelRepository.findById(id);
  }

  public List<Hotel> obtenerHotelesPorCiudad(String ciudad) {
    return hotelRepository.findByCiudad(ciudad);
  }

  public void eliminarHotel(Long id) {
      hotelRepository.deleteById(id);
  }
}
