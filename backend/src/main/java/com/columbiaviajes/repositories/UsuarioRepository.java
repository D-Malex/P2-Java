package com.columbiaviajes.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Usuario;


@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long>{
    
    // CREATE

    // READ BY firstname
    Optional<Usuario> findByEmail(String email);

    // UPDATE

    // DELETE
}
