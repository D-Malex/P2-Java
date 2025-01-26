package com.columbiaviajes.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Usuario;


@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {
    // CREATE

    // READ BY firstname
    Optional<Usuario> findByEmail(String email);
    
    @Query("SELECT u FROM Usuario u WHERE u.rol.id = :id_rol")
    List<Usuario> findByRol(@Param("id_rol") Long id_rol);
    // UPDATE

    // DELETE
}