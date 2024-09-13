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
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @Column(columnDefinition="VARCHAR(20)")
    String roll;
    
    @Column(columnDefinition="VARCHAR(20)")
    String psw;
    
    @Column(name="first_name", columnDefinition="VARCHAR(50)")
    String firstName;

    @Column(name="last_name", columnDefinition="VARCHAR(50)")
    String lastName;

    @Column(unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String address;

    @Column(name="email", unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String email;

    @Column(name="phone_number", columnDefinition="VARCHAR(20)")
    String phoneNumber;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="user")
    List<Travel> travels;
}
