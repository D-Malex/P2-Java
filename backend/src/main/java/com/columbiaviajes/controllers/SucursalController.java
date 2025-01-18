package com.columbiaviajes.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.columbiaviajes.models.Sucursal;
import com.columbiaviajes.services.SucursalService;

@RestController
@RequestMapping("/sucursales")
public class SucursalController {
    private final SucursalService sucursalService;

    public SucursalController(SucursalService sucursalService) {
        this.sucursalService = sucursalService;
    }

    @PostMapping("/new") //CREAR 1 SUCURSAL NUEVO
    public ResponseEntity<Sucursal> crearUsuario(@RequestBody Sucursal sucursal) {
        Sucursal nuevaSucursal = sucursalService.crearSucursal(sucursal);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaSucursal);
    }

    @PostMapping("/news") //CREAR * SUCURSALES NUEVOS
    public ResponseEntity<List<Sucursal>> crearSucursales(@RequestBody List<Sucursal> sucursales) {
        List<Sucursal> sucursalesCreadas = new ArrayList<>();
        List<String> errores = new ArrayList<>();

        for (Sucursal sucursal : sucursales) {
            try {
                Sucursal nuevaSucursal = sucursalService.crearSucursal(sucursal);
                sucursalesCreadas.add(nuevaSucursal);
            } catch (Exception e) {
                errores.add("❌ ERROR: Creacion de sucursal fallida, sucursal: " + sucursal);
            }
        }

        if (!errores.isEmpty()) {
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .body(sucursalesCreadas);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(sucursalesCreadas);
    }

    @GetMapping
    public ResponseEntity<List<Sucursal>> obtenerSucursales() {
        return ResponseEntity.ok(sucursalService.obtenerSucursales());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sucursal> obtenerSucursalPorId(@PathVariable Long id) {
        return sucursalService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarSucursal(@PathVariable Long id) {
        sucursalService.eliminarSucursal(id);
        return ResponseEntity.ok().body("Sucursal elimnada con exito.");
    }
}
