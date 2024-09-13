package com.madev.ColumbiaViajes.Security.JWT;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.time.expiration}")
    private String timeExpiration;

    // GENERATE ACCESS TOKEN
    @SuppressWarnings("deprecation")
    public String generateAccessToken(String emailString) {
        return Jwts.builder()
            .setSubject(emailString)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+Long.parseLong(timeExpiration)))
            .signWith(getSignatureKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    // GET SIGNATURE TOKEN 
    public Key getSignatureKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // VALID TOKEN
    @SuppressWarnings("deprecation")
    public boolean isTokenValid(String token) {
        try{
            Jwts.parser()
                .setSigningKey(getSignatureKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
            return true;
        }catch(Exception e) {
            log.error("Invalid token, error: ".concat(e.getMessage()));
            return false;
        }
    }

    // GET ALL CLAIMS
    @SuppressWarnings("deprecation")
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
            .setSigningKey(getSignatureKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    // GET CLAIM
    public <T>T getClaim(String token, Function<Claims, T> claimsFunction) {
        Claims claims = extractAllClaims(token);
        return claimsFunction.apply(claims);
    } 

    // GET EMAIL OF TOKEN
    public String getEmailFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }
}
