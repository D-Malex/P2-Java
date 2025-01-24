package com.columbiaviajes.controllers;

import com.columbiaviajes.dto.PaqueteDTO;
import com.columbiaviajes.services.PaqueteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/paquetes")
public class PaqueteController {

    private final PaqueteService paqueteService;

    public PaqueteController(PaqueteService paqueteService) {
        this.paqueteService = paqueteService;
    }

    @GetMapping
    public ResponseEntity<List<PaqueteDTO>> obtenerPaquetes() {
        List<PaqueteDTO> paquetes = paqueteService.generarPaquetes();
        return ResponseEntity.ok(paquetes);
    }
}
