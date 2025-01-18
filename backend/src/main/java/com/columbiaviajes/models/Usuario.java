package com.columbiaviajes.models;

import java.util.List;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    List<Viaje> viajes;
    
    @ManyToOne
    @JoinColumn(name = "id_rol")
    RoleEntity rol;
}
