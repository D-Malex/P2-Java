package com.columbiaviajes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.columbiaviajes.repositories.RoleRepository;

@SpringBootApplication
public class ColumbiaViajesApplication {

	RoleRepository rol;

	public static void main(String[] args) {
		SpringApplication.run(ColumbiaViajesApplication.class, args);
		
	}

}
