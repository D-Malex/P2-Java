package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.ERole;
import com.columbiaviajes.models.RoleEntity;



@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long>{
    // CREATE

    // READ BY firstname
    RoleEntity findByNombre(ERole nombre);

    // UPDATE

    // DELETE
}
