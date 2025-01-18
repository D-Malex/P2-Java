package com.columbiaviajes.login;

import com.columbiaviajes.models.RoleEntity;
import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@FieldDefaults(level=AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
public class AuthResponse {
    String token;
    RoleEntity userType;
    String message;
}
