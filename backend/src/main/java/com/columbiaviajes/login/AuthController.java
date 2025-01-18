package com.columbiaviajes.login;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        try {
            // Validar credenciales y obtener respuesta
            AuthResponse authResponse = authService.authenticate(authRequest.getEmail(), authRequest.getPassword());

            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            // En caso de credenciales incorrectas, devolver error 401
            return ResponseEntity.status(401).body(new AuthResponse(null, null, "Credenciales incorrectas"));
        }
    }
}