package com.columbiaviajes.models;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@Data
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Viaje {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_viaje;

    @ManyToOne(targetEntity=Sucursal.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_sucursal")
    Sucursal sucursal;
    
    @ManyToOne(targetEntity=Usuario.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_usuario")
    Usuario usuario;

    @ManyToOne(targetEntity=Hotel.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_hotel")
    Hotel hotel;

    @Column(name="pension_hotel")
    String pensionHotel;
    
    @ManyToOne(targetEntity=Vuelo.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_vuelo")
    Vuelo vuelo;

    @Column(name="clase_vuelo")
    String claseVuelo;

    @Column(name="fecha_llegada", columnDefinition="DATE")
    LocalDate fechaLlegada;
    
    @Column(name="fecha_retorno", columnDefinition="DATE")
    LocalDate fechaRetorno;

    @Column(name="precio")
    Long precio;
}
