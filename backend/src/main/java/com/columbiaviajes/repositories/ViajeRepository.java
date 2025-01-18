package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Viaje;


@Repository
public interface ViajeRepository extends CrudRepository<Viaje, Long>{
}
