package com.columbiaviajes.controllers;

import java.util.List;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.columbiaviajes.models.Venta;
import com.columbiaviajes.services.VentaService;

@RestController
@RequestMapping("/ventas")
public class VentaController {
  private final VentaService ventaService;

  public VentaController(VentaService ventaService) {
      this.ventaService = ventaService;
  }

  @PostMapping("/new")
  public ResponseEntity<Venta> crearVenta(@RequestBody Venta venta) {
      Venta nuevaVenta = ventaService.crearVenta(venta);
      return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
  }

  @PostMapping("/news")
  public ResponseEntity<List<Venta>> crearVentas(@RequestBody List<Venta> ventas) {
    List<Venta> ventasCreadas = new ArrayList<>();
    List<String> errores = new ArrayList<>();

    for (Venta venta : ventas) {
        try {
            Venta nuevaVenta = ventaService.crearVenta(venta);
            ventasCreadas.add(nuevaVenta);
        } catch (Exception e) {
            errores.add("❌ ERROR: Creacion de venta fallida, venta: " + venta);
        }
    }

    if (!errores.isEmpty()) {
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
            .body(ventasCreadas);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(ventasCreadas);
  }

  @GetMapping
  public ResponseEntity<List<Venta>> obtenerVentas() {
      return ResponseEntity.ok(ventaService.obtenerVentas());
  }

  @GetMapping("/usuario/{id_usuario}")
  public ResponseEntity<List<Venta>> obtenerVentasPorUsuario(@PathVariable Long id_usuario) {
      List<Venta> ventas = ventaService.obtenerVentasPorUsuario(id_usuario);
      System.out.println(ventas);
      if (ventas.isEmpty()) {
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok(ventas);
  }
  
  @GetMapping("/{id_venta}")
  public ResponseEntity<Venta> obtenerVentaPorId(@PathVariable Long id) {
      return ventaService.buscarPorId(id)
          .map(ResponseEntity::ok)
          .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> eliminarVenta(@PathVariable Long id) {
      ventaService.eliminarVenta(id);
      return ResponseEntity.ok().body("Venta eliminada con éxito.");
  }
}
