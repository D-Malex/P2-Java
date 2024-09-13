package com.madev.ColumbiaViajes.Models;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@Data
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Flight {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    
    @Column(name="date_hour", columnDefinition="DATE")
    LocalDate dateHour;

    @NotBlank
    @Size(max=40)
    @Column(columnDefinition="VARCHAR(40)")
    String origin;

    @NotBlank
    @Size(max=40)
    @Column(columnDefinition="VARCHAR(40)")
    String destination;

    @NotBlank
    @Column(name="total_places")
    Integer totalPlaces;

    @NotBlank
    @Column(name="turist_places")
    Integer turistPlaces;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="flight")
    List<Travel> travels;
}
