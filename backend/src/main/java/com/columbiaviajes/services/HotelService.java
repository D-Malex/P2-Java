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

  public List<Hotel> obtenerHoteles() {
      return (List<Hotel>) hotelRepository.findAll();
  }

  public Optional<Hotel> buscarPorId(Long id) {
      return hotelRepository.findById(id);
  }

  public void eliminarHotel(Long id) {
      hotelRepository.deleteById(id);
  }
}
