package com.columbiaviajes.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.columbiaviajes.models.Usuario;
import com.columbiaviajes.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/new") //CREAR 1 USUARIO NUEVO
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @PostMapping("/news") //CREAR * USUARIOS NUEVOS
    public ResponseEntity<List<Usuario>> crearUsuarios(@RequestBody List<Usuario> usuarios) {
        List<Usuario> usuariosCreados = new ArrayList<>();
        List<String> errores = new ArrayList<>();

        for (Usuario usuario : usuarios) {
            try {
                Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);
                usuariosCreados.add(nuevoUsuario);
            } catch (Exception e) {
                errores.add("❌ ERROR: Creacion de usuario fallida, usuario: " + usuario);
            }
        }

        if (!errores.isEmpty()) {
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .body(usuariosCreados);
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(usuariosCreados);
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario actualizado = usuarioService.actualizarUsuario(usuario);
            if (actualizado == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado o email duplicado.");
            }
            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario: " + e.getMessage());
        }
    }
    

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        return ResponseEntity.ok(usuarioService.obtenerUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/")
    public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@RequestParam String email) {
        return usuarioService.buscarPorEmail(email)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/emails")
    public List<String> obtenerEmail() {
        return usuarioService.obtenerEmails();
    }
    


    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok().body("Usuario elimnado con exito.");
    }
}
