package com.columbiaviajes.login;

import com.columbiaviajes.services.UsuarioService;
import com.columbiaviajes.models.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.security.Key;
import java.util.Date;

@Service
public class AuthService {

    private final UsuarioService usuarioService;
    // Clave secreta para firmar el token
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public AuthService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    public AuthResponse authenticate(String email, String password) throws AuthenticationException {
        // Buscar usuario por email
        Optional<Usuario> optionalUsuario = usuarioService.buscarPorEmail(email);

        if (optionalUsuario.isEmpty()) {
            throw new AuthenticationException("Usuario no encontrado.");
        }
        
        Usuario usuario = optionalUsuario.get();

        // Validar contraseña
        if (!usuario.getPsw().equals(password)) {
            throw new AuthenticationException("Contraseña incorrecta.");
        }

        // Generar token JWT
        String token = Jwts.builder()
            .setSubject(usuario.getEmail())
            .claim("userType", usuario.getRol())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hora de expiración
            .signWith(SECRET_KEY)
            .compact();

        return new AuthResponse(token, usuario.getRol(), "Autenticación exitosa");
    }
}