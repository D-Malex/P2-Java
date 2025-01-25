package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.columbiaviajes.models.Venta;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Long>{
  
}
