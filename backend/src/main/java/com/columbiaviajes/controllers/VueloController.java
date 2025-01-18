package com.columbiaviajes.controllers;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.columbiaviajes.models.Vuelo;
import com.columbiaviajes.services.VueloService;

@RestController
@RequestMapping("/vuelos")
public class VueloController {
    private final VueloService vueloService;

    public VueloController(VueloService vueloService) {
        this.vueloService = vueloService;
    }

    @PostMapping("/new")
    public ResponseEntity<Vuelo> crearVuelo(@RequestBody Vuelo vuelo) {
        Vuelo nuevoVuelo = vueloService.crearVuelo(vuelo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoVuelo);
    }

    @PostMapping("/news")
    public ResponseEntity<List<Vuelo>> crearVuelos(@RequestBody List<Vuelo> vuelos) {
      List<Vuelo> vuelosCreados = new ArrayList<>();
      List<String> errores = new ArrayList<>();

      for (Vuelo vuelo : vuelos) {
          try {
              Vuelo nuevoVuelo = vueloService.crearVuelo(vuelo);
              vuelosCreados.add(nuevoVuelo);
          } catch (Exception e) {
              errores.add("❌ ERROR: Creacion de vuelo fallida, vuelo: " + vuelo);
          }
      }

      if (!errores.isEmpty()) {
          return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
              .body(vuelosCreados);
      }

        return ResponseEntity.status(HttpStatus.CREATED).body(vuelosCreados);
    }

    @GetMapping
    public ResponseEntity<List<Vuelo>> obtenerVuelos() {
        return ResponseEntity.ok(vueloService.obtenerVuelos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vuelo> obtenerVueloPorId(@PathVariable Long id) {
        return vueloService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarVuelo(@PathVariable Long id) {
        vueloService.eliminarVuelo(id);
        return ResponseEntity.ok().body("Vuelo eliminado con éxito.");
    }
}
