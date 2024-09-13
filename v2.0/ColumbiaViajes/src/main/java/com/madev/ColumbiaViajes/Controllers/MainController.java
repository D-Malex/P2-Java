package com.madev.ColumbiaViajes.Controllers;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.madev.ColumbiaViajes.Controllers.request.CreateUserDTO;
import com.madev.ColumbiaViajes.Models.ERole;
import com.madev.ColumbiaViajes.Models.RoleEntity;
import com.madev.ColumbiaViajes.Models.UserEntity;
import com.madev.ColumbiaViajes.Repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
public class MainController {

    @Autowired
    private UserRepository userRepository;

    // EASTER EGG!
    @GetMapping("/olleh")
    public String helloMsj() {
        return "Hola Mundo!";
    }

    // EASTER EGG!
    @GetMapping("order/welcome")
    public String welcomeMsj() {
        return "Bienvenído a la P-API de Columbia Viajes, disfrutá tu estadia!"; //P-API --> PUBLIC API
    }

    // CREATE A NEW USER
    @PostMapping("order/newuser")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        // Roles
        Set<RoleEntity> roles = createUserDTO.getRoles().stream()
            .map(role -> RoleEntity.builder()
                .name(ERole.valueOf(role))
                .build())
            .collect(Collectors.toSet());

        // All atributes
        UserEntity userEntity = UserEntity.builder()
            .firstName(createUserDTO.getFirstName())
            .lastName(createUserDTO.getLastName())
            .address(createUserDTO.getAddress())
            .phoneNumber(createUserDTO.getPhoneNumber())
            .email(createUserDTO.getEmail())
            .psw(createUserDTO.getPsw())
            .roles(roles)
            .build();

        userRepository.save(userEntity);

        return ResponseEntity.ok(userEntity);
    }

    // DELETE A USER
    @DeleteMapping("order/deleteuser")
    public String deleteUser(@RequestParam String id) {
        userRepository.deleteById(Long.parseLong(id));
        return "Se elimino exitosamente el usuario ".concat(id);
    }
}


