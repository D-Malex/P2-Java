package com.madev.ColumbiaViajes.Security.Filters;

import java.awt.PageAttributes;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.madev.ColumbiaViajes.Models.UserEntity;
import com.madev.ColumbiaViajes.Security.JWT.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UserEntity userEntity = null;
        String email = "";
        String psw = "";

        try {
            userEntity = new ObjectMapper().readValue(request.getInputStream(), UserEntity.class);
            email = userEntity.getEmail();
            psw = userEntity.getPsw();
        } catch (StreamReadException e) {throw new RuntimeException(e);}
        catch (DatabindException e) {throw new RuntimeException(e);}
        catch (IOException e) {throw new RuntimeException(e);}

        log.info("✅ INTENTO AUTENTICACION");
        log.info("Username: "+email);
        log.info("Password: "+psw);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, psw);
        return getAuthenticationManager().authenticate(authenticationToken);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        
        User user = (User) authResult.getPrincipal();
        String token = jwtUtils.generateAccessToken(user.getUsername());
        response.addHeader("Authorization", token);

        Map<String, Object> HttpResponse = new HashMap<>();
        HttpResponse.put("token", token);
        HttpResponse.put("Message", "Authentication Successful");
        HttpResponse.put("Email", user.getUsername());
        log.info("✅ AUTENTICACION CORRECTA");

        response.getWriter().write(new ObjectMapper().writeValueAsString(HttpResponse));
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().flush();
        super.successfulAuthentication(request, response, chain, authResult);
    }

}
