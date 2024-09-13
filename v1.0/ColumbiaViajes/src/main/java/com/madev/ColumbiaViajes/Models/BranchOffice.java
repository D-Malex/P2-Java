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
@Table(name="Branch_office")
public class BranchOffice {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;

    @Column(columnDefinition="VARCHAR(60)", nullable=false)
    String address;

    @Column(name="email", unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String email;

    @Column(name="phone_number", columnDefinition="VARCHAR(20)")
    String phoneNumber;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="branchOffice")
    List<Travel> travels;
}
