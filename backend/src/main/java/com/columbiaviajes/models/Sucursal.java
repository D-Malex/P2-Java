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
@Table(name="Sucursal")
public class Sucursal {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_Sucursal;

    @Column(nullable=false)
    String direccion;

    @Column(name="email", unique=true, nullable=false)
    String email;

    @Column(name="telefono")
    String telefono;

    @OneToMany(targetEntity=Viaje.class, fetch=FetchType.LAZY, mappedBy="sucursal")
    List<Viaje> viajes;
}