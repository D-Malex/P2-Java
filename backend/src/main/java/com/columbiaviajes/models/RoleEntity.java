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
    @Column(nullable=false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id_rol;

    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    ERole nombre;
    
    @JsonIgnore
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Usuario> usuarios;
}