package com.madev.ColumbiaViajes.Repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.madev.ColumbiaViajes.Models.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long>{
    
    // CREATE

    // READ BY firstname
    Optional<UserEntity> findByEmail(String email);

    // UPDATE

    // DELETE
}
