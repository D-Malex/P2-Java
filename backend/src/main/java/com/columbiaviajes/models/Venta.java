package com.columbiaviajes.models;

import java.time.LocalDate;
import jakarta.persistence.CascadeType;
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
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id_venta;

    // Aquí se registrará el vendedor que realizó la venta
    @ManyToOne(targetEntity = Usuario.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_usuario", nullable = false)
    Usuario vendedor;

    // El viaje que fue vendido por este vendedor
    @ManyToOne(targetEntity = Viaje.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_viaje", nullable = false)
    Viaje viaje;

    // Cuándo se realizó la venta
    @JoinColumn(name = "fecha_venta", nullable = false)
    LocalDate fechaVenta; 
}
