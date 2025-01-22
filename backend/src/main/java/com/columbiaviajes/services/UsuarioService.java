package com.columbiaviajes.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.columbiaviajes.models.Usuario;
import com.columbiaviajes.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(usuario.getId_usuario());
        if (usuarioExistente.isEmpty()) {
            throw new IllegalArgumentException("El usuario no existe en la base de datos.");
        }
        
        Optional<Usuario> usuarioConEmail = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioConEmail.isPresent() && !usuarioConEmail.get().getId_usuario().equals(usuario.getId_usuario())) {
            throw new IllegalArgumentException("El email ya está siendo usado por otro usuario.");
        }
        
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> obtenerUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    public List<String> obtenerEmails() {
        List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAll();
        List<String> emails = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            emails.add(usuario.getEmail());
        }
        return emails;
    }
    

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}