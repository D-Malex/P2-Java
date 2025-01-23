package com.columbiaviajes.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class Vuelo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_vuelo;
    
    @Column(columnDefinition="DATE")
    LocalDate fecha;

    @Column(columnDefinition="TIME")
    LocalDateTime hora;

    String origen;

    @Column()
    String destino;

    @Column(name="plazas_totales")
    Integer plazasTotales;

    @Column(name="plazas_turista")
    Integer plazasTurista;

    @OneToMany(targetEntity=Viaje.class, fetch=FetchType.LAZY, mappedBy="vuelo")
    @JsonIgnore
    List<Viaje> viajes;
}
