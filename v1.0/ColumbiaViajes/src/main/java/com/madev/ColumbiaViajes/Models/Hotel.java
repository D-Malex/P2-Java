package com.madev.ColumbiaViajes.Models;

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
public class Hotel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    
    @Column(columnDefinition="VARCHAR(50)")
    String name;

    @Column(unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String address;

    @Column(columnDefinition="VARCHAR(40)")
    String city;

    @Column(name="phone_number", columnDefinition="VARCHAR(20)")
    String phoneNumber;

    @Column(name="places_avaible")
    Integer placesAvaible;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="hotel")
    List<Travel> travels;
}
