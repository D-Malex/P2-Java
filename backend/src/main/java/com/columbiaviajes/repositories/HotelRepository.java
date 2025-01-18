package com.columbiaviajes.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.columbiaviajes.models.Hotel;



@Repository
public interface HotelRepository extends CrudRepository<Hotel, Long>{
}
