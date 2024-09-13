package com.madev.ColumbiaViajes.Controllers.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class CreateUserDTO {
    
    @NotBlank
    @Size(max=50)
    String firstName;
    
    @NotBlank
    @Size(max=50)
    String lastName;
    
    @NotBlank
    String psw;
    
    @Email
    @NotBlank
    @Size(max=60)
    String email;
    
    @NotBlank
    @Size(max=60)
    String address;
    
    @Size(max=20)
    String phoneNumber;

    Set<String> roles;
}
