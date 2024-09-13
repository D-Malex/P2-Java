package com.madev.ColumbiaViajes.Models;

import java.util.List;
import java.util.Set;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
@Builder
@Table(name="user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long id;
    
    @NotBlank
    @Size(max=50)
    @Column(name="first_name", columnDefinition="VARCHAR(50)")
    String firstName;

    @NotBlank
    @Size(max=50)
    @Column(name="last_name", columnDefinition="VARCHAR(50)")
    String lastName;
    
    @NotBlank
    String psw;

    @Email
    @NotBlank
    @Size(max=60)
    @Column(name="email", unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String email;

    @Column(unique=true, columnDefinition="VARCHAR(60)", nullable=false)
    String address;

    @Column(name="phone_number", columnDefinition="VARCHAR(20)")
    String phoneNumber;

    @OneToMany(targetEntity=Travel.class, fetch=FetchType.LAZY, mappedBy="user")
    List<Travel> travels;
    
    @ManyToMany(targetEntity=RoleEntity.class, fetch=FetchType.EAGER, cascade=CascadeType.PERSIST)
    @JoinTable(name="user_roles", joinColumns=@JoinColumn(name="id_user"), inverseJoinColumns=@JoinColumn(name="id_role"))
    Set<RoleEntity> roles;
}
