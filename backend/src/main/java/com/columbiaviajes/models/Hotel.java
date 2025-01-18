package com.columbiaviajes.models;

import java.util.List;
import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@Data
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Hotel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_hotel;
    String nombre;

    @Column(nullable=false)
    String direccion;
    String ciudad;
    String telefono;

    @Column(name="plazas_disponibles")
    Integer plazasDisponibles;

    @OneToMany(targetEntity=Viaje.class, fetch=FetchType.LAZY, mappedBy="hotel")
    List<Viaje> viajes;
}
