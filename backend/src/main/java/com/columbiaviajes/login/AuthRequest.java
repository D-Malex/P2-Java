package com.columbiaviajes.login;

import lombok.experimental.FieldDefaults;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Data;

@FieldDefaults(level=AccessLevel.PRIVATE)
@AllArgsConstructor
@Data
public class AuthRequest {
    String email;
    String password;
}
