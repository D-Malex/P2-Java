package com.madev.ColumbiaViajes.Models;

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
    Long id;

    @Enumerated(EnumType.STRING)
    ERole name;
}
