package com.madev.ColumbiaViajes.Models;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@Data
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Travel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @ManyToOne(targetEntity=BranchOffice.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_branch_office")
    BranchOffice branchOffice;
    
    @ManyToOne(targetEntity=UserEntity.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_user")
    UserEntity user;

    @ManyToOne(targetEntity=Hotel.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_hotel")
    Hotel hotel;

    @Column(name="pension_hotel", columnDefinition="VARCHAR(20)")
    String pensionHotel;
    
    @ManyToOne(targetEntity=Flight.class, cascade=CascadeType.PERSIST)
    @JoinColumn(name="id_flight")
    Flight flight;

    @Column(name="flight_class", columnDefinition="VARCHAR(20)")
    String flightClass;

    @Column(name="arrive_date", columnDefinition="DATE")
    LocalDate arriveDate;
    
    @Column(name="return_date", columnDefinition="DATE")
    LocalDate returnDate;
}
