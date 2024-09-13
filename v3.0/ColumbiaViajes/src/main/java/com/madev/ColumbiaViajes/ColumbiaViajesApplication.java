package com.madev.ColumbiaViajes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.madev.ColumbiaViajes.Models.UserEntity;
import com.madev.ColumbiaViajes.Models.ERole;
import com.madev.ColumbiaViajes.Models.RoleEntity;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;

import com.madev.ColumbiaViajes.Repositories.UserRepository;


@SpringBootApplication
public class ColumbiaViajesApplication {

	public static void main(String[] args) {SpringApplication.run(ColumbiaViajesApplication.class, args);}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

	@Bean
	CommandLineRunner init() {
		return args -> {
			UserEntity userEntityOwner = UserEntity.builder()
				.firstName("Matias")
				.lastName("Seba Mallo")
				.address("Adonde Mires 159")
				.phoneNumber("1952634873")
				.email("madev@gmail.com")
				.psw(passwordEncoder.encode("123"))
				.roles(Set.of(RoleEntity.builder().name(ERole.valueOf(ERole.OWNER.name())).build()))
				.build();
			
			UserEntity userEntityAdministrator = UserEntity.builder()
				.firstName("Carolina")
				.lastName("Rombolá")
				.address("Pora Ya 8453")
				.phoneNumber("5821649325")
				.email("carol@gmail.com")
				.psw(passwordEncoder.encode("123"))
				.roles(Set.of(RoleEntity.builder().name(ERole.valueOf(ERole.ADMINISTRATOR.name())).build()))
				.build();
			
			UserEntity userEntitySeller = UserEntity.builder()
				.firstName("Albert")
				.lastName("Huffman")
				.address("Quien sabe 563")
				.phoneNumber("5195345357")
				.email("hufi@gmail.com")
				.psw(passwordEncoder.encode("123"))
				.roles(Set.of(RoleEntity.builder().name(ERole.valueOf(ERole.SELLER.name())).build()))
				.build();

			UserEntity userEntityTurist = UserEntity.builder()
				.firstName("Elturista")
				.lastName("Moderno")
				.address("Nomadia 357")
				.phoneNumber("6925846351")
				.email("turs@gmail.com")
				.psw(passwordEncoder.encode("123"))
				.roles(Set.of(RoleEntity.builder().name(ERole.valueOf(ERole.TURIST.name())).build()))
				.build();

			userRepository.save(userEntityOwner);
			userRepository.save(userEntityAdministrator);
			userRepository.save(userEntitySeller);
			userRepository.save(userEntityTurist);
		};
	}

}
