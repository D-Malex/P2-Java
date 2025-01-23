package com.columbiaviajes.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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