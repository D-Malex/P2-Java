// services/PaqueteService.java
package com.columbiaviajes.services;

import com.columbiaviajes.dto.PaqueteDTO;
import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.models.Vuelo;
import com.columbiaviajes.repositories.HotelRepository;
import com.columbiaviajes.repositories.VueloRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class PaqueteService {
    private final HotelRepository hotelRepository;
    private final VueloRepository vueloRepository;

    public List<PaqueteDTO> generarPaquetes() {
        List<Hotel> hoteles = (List<Hotel>) hotelRepository.findAll();
        List<Vuelo> vuelos = (List<Vuelo>) vueloRepository.findAll();
        List<PaqueteDTO> paquetes = new ArrayList<>();

        // Cruza vuelos y hoteles para generar paquetes
        for (Vuelo vuelo : vuelos) {
            for (Hotel hotel : hoteles) {
                // Validar plazas disponibles en el hotel y fecha del vuelo posterior a hoy
                if (vuelo.getDestino().equalsIgnoreCase(hotel.getCiudad())
                        && hotel.getPlazasDisponibles() > 0
                        && vuelo.getFecha().isAfter(LocalDate.now())) {
                    paquetes.add(new PaqueteDTO(hotel, vuelo));
                }
            }
        }

        return paquetes;
    }
}
