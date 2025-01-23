package com.columbiaviajes.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
    @JsonIgnore
    List<Viaje> viajes;
}
