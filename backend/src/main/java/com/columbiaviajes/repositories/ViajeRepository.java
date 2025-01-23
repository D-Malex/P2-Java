package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import com.columbiaviajes.models.Viaje;

@Repository
public interface ViajeRepository extends CrudRepository<Viaje, Long> {

  @Query("SELECT v FROM Viaje v ORDER BY v.fechaLlegada DESC")
  List<Viaje> obtenerViajesOrdenados();
}
