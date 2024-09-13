package com.madev.ColumbiaViajes.Models;

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
public class Hotel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    
    @NotBlank
    @Size(max=50)
    @Column(columnDefinition="VARCHAR(50)")
    String name;

    @NotBlank
    @Size(max=60)
    @Column(unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String address;

    @NotBlank
    @Size(max=40)
    @Column(columnDefinition="VARCHAR(40)")
    String city;

    @Size(max=20)
    @Column(name="phone_number", columnDefinition="VARCHAR(20)")
    String phoneNumber;

    @NotBlank
    @Column(name="places_avaible")
    Integer placesAvaible;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="hotel")
    List<Travel> travels;
}
