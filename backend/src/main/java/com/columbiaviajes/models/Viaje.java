package com.columbiaviajes.models;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Viaje {
    @Id
    @Column(nullable=false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_viaje;

    @ManyToOne(targetEntity=Sucursal.class, cascade=CascadeType.PERSIST)
    @Column(nullable=false)
    @JoinColumn(name="id_sucursal")
    Sucursal sucursal;
    
    @ManyToOne(targetEntity=Usuario.class, cascade=CascadeType.PERSIST)
    @Column(nullable=false)
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

    @Column(name="fecha_llegada", columnDefinition="DATE", nullable=false)
    LocalDate fechaLlegada;
    
    @Column(name="fecha_retorno", columnDefinition="DATE", nullable=false)
    LocalDate fechaRetorno;

    @Column(name="precio", nullable=false)
    Long precio;
}
