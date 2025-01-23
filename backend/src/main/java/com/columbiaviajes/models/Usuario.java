package com.columbiaviajes.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name="Usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_usuario;
    
    @Column(nullable=false)
    String nombre;
    
    @Column(nullable=false)
    String apellido;
    
    @Column(unique=true, nullable=false)
    String email;

    @Column(nullable=false)
    String psw;

    @Column(nullable=false)
    String direccion;
    @Column(nullable=false)
    String telefono;

    @OneToMany(targetEntity=Viaje.class, fetch=FetchType.LAZY, mappedBy="usuario")
    @JsonIgnore
    List<Viaje> viajes;
    
    @ManyToOne
    @JoinColumn(name = "id_rol")
    RoleEntity rol;
}
