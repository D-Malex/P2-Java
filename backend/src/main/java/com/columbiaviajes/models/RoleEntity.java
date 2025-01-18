package com.columbiaviajes.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@FieldDefaults(level=AccessLevel.PRIVATE)
public class RoleEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_rol;

    @Enumerated(EnumType.STRING)
    ERole nombre;
    
    @JsonIgnore
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Usuario> usuarios;
}