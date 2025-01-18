package com.columbiaviajes.controllers;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.columbiaviajes.models.Viaje;
import com.columbiaviajes.services.ViajeService;

@RestController
@RequestMapping("/viajes")
public class ViajeController {
    private final ViajeService viajeService;

    public ViajeController(ViajeService viajeService) {
        this.viajeService = viajeService;
    }

    @PostMapping("/new")
    public ResponseEntity<Viaje> crearViaje(@RequestBody Viaje viaje) {
        Viaje nuevoViaje = viajeService.crearViaje(viaje);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoViaje);
    }

    @PostMapping("/news")
    public ResponseEntity<List<Viaje>> crearViajes(@RequestBody List<Viaje> viajes) {
      List<Viaje> viajesCreados = new ArrayList<>();
      List<String> errores = new ArrayList<>();

      for (Viaje viaje : viajes) {
          try {
              Viaje nuevoViaje = viajeService.crearViaje(viaje);
              viajesCreados.add(nuevoViaje);
          } catch (Exception e) {
              errores.add("❌ ERROR: Creacion de viaje fallida, viaje: " + viaje);
          }
      }
      
      if (!errores.isEmpty()) {
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
            .body(viajesCreados);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(viajesCreados);
    }

    @GetMapping
    public ResponseEntity<List<Viaje>> obtenerViajes() {
        return ResponseEntity.ok(viajeService.obtenerViajes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Viaje> obtenerViajePorId(@PathVariable Long id) {
        return viajeService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarViaje(@PathVariable Long id) {
        viajeService.eliminarViaje(id);
        return ResponseEntity.ok().body("Viaje eliminado con éxito.");
    }
}
