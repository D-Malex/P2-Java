package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Vuelo;


@Repository
public interface VueloRepository extends CrudRepository<Vuelo, Long> {}
