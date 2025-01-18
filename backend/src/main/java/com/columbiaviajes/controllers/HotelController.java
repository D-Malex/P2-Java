package com.columbiaviajes.controllers;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.services.HotelService;

@RestController
@RequestMapping("/hoteles")
public class HotelController {
    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping("/new")
    public ResponseEntity<Hotel> crearHotel(@RequestBody Hotel hotel) {
        Hotel nuevoHotel = hotelService.crearHotel(hotel);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoHotel);
    }

    @PostMapping("/news")
    public ResponseEntity<List<Hotel>> crearHoteles(@RequestBody List<Hotel> hoteles) {
      List<Hotel> hotelesCreados = new ArrayList<>();
      List<String> errores = new ArrayList<>();

      for (Hotel hotel : hoteles) {
          try {
              Hotel nuevoHotel = hotelService.crearHotel(hotel);
              hotelesCreados.add(nuevoHotel);
          } catch (Exception e) {
              errores.add("❌ ERROR: Creacion de hotel fallida, hotel: " + hotel);
          }
      }

      if (!errores.isEmpty()) {
          return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
              .body(hotelesCreados);
      }

      return ResponseEntity.status(HttpStatus.CREATED).body(hotelesCreados);
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> obtenerHoteles() {
        return ResponseEntity.ok(hotelService.obtenerHoteles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> obtenerHotelPorId(@PathVariable Long id) {
        return hotelService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarHotel(@PathVariable Long id) {
        hotelService.eliminarHotel(id);
        return ResponseEntity.ok().body("Hotel eliminado con éxito.");
    }
}
