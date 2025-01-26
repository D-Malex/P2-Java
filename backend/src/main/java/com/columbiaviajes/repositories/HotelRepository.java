package com.columbiaviajes.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.columbiaviajes.models.Hotel;

@Repository
public interface HotelRepository extends CrudRepository<Hotel, Long>{

  List<Hotel> findByCiudad(String ciudad);
}
