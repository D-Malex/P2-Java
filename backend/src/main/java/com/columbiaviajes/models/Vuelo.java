package com.columbiaviajes.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    List<Viaje> viajes;
}
