package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Sucursal;




@Repository
public interface SucursalRepository extends CrudRepository<Sucursal, Long> {
}
