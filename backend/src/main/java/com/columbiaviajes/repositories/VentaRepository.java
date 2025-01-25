package com.columbiaviajes.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.columbiaviajes.models.Venta;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Long>{
  
  @Query("SELECT v FROM Venta v WHERE v.vendedor.id_usuario = :id_usuario")
  List<Venta> buscarVentasPorUsuario(@Param("id_usuario") Long id_usuario);

}
