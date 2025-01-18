package com.columbiaviajes.components;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.columbiaviajes.models.ERole;
import com.columbiaviajes.models.RoleEntity;
import com.columbiaviajes.models.Usuario;
import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.models.Vuelo;
import com.columbiaviajes.models.Sucursal;
import com.columbiaviajes.repositories.RoleRepository;
import com.columbiaviajes.repositories.UsuarioRepository;
import com.columbiaviajes.repositories.HotelRepository;
import com.columbiaviajes.repositories.SucursalRepository;
import com.columbiaviajes.repositories.VueloRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UsuarioRepository usuarioRepository;
    private final HotelRepository hotelRepository;
    private final SucursalRepository sucursalRepository;
    private final VueloRepository vueloRepository;
    
    public DataInitializer(RoleRepository roleRepository, UsuarioRepository usuarioRepository, VueloRepository vueloRepository, 
                            HotelRepository hotelRepository, SucursalRepository sucursalRepository) {
        this.roleRepository = roleRepository;
        this.usuarioRepository = usuarioRepository;
        this.hotelRepository = hotelRepository;
        this.sucursalRepository = sucursalRepository;
        this.vueloRepository = vueloRepository;
    }

    @Override
    public void run(String... args) {
        //** ROLES **/
        if (roleRepository.count() == 0) {
            // Inserta los roles
            roleRepository.save(new RoleEntity(null, ERole.DUENIO, null));
            roleRepository.save(new RoleEntity(null, ERole.ADMINISTRADOR, null));
            roleRepository.save(new RoleEntity(null, ERole.VENDEDOR, null));
            roleRepository.save(new RoleEntity(null, ERole.TURISTA, null));
            System.out.println("✅ Roles iniciales cargados en la base de datos con exito.");
        } else {
            System.out.println("👍 Los roles ya existen en la base de datos.");
        }

        //** USUARIOS INICIALES **/
        if (usuarioRepository.count() == 0) {
            usuarioRepository.save(new Usuario(
                null, 
                "Matias",
                "Seba Mallo",
                "madev@gmail.com", 
                "1234", 
                "Acala vuelta 123", 
                "12345678", 
                null, 
                roleRepository.findByNombre(ERole.DUENIO)
            ));
            usuarioRepository.save(new Usuario(
                null, 
                "Carolina",
                "Rombolá",
                "caro@gmail.com", 
                "1234", 
                "Nlaotra Cuadra 123", 
                "12345678", 
                null, 
                roleRepository.findByNombre(ERole.ADMINISTRADOR)
            ));
            usuarioRepository.save(new Usuario(
                null, 
                "Lilia",
                "Mallo",
                "lili@gmail.com", 
                "1234", 
                "Po raca 123", 
                "12345678", 
                null, 
                roleRepository.findByNombre(ERole.VENDEDOR)
            ));
            usuarioRepository.save(new Usuario(
                null, 
                "Zulma",
                "Acosta",
                "zulmi@gmail.com", 
                "1234", 
                "Puesdon Demas 123", 
                "12345678", 
                null, 
                roleRepository.findByNombre(ERole.TURISTA)
            ));
            System.out.println("✅ Usuarios iniciales cargados en la base de datos con exito.");
        } else {
            System.out.println("👍 Los usuarios ya existen en la base de datos.");
        }
        
        //** HOTELES INICIALES **/
        if (hotelRepository.count() == 0) {
            hotelRepository.save(new Hotel(
                null,
                "La Tostadita",
                "Pora hi 456",
                "Hawaii",
                "12345678",
                500,
                null
            ));
            hotelRepository.save(new Hotel(
                null,
                "El Polinautico",
                "Sabora 123",
                "New York",
                "12345678",
                300,
                null
            ));
            hotelRepository.save(new Hotel(
                null,
                "HOME SUIT HOME",
                "la pampa 789",
                "Moscú",
                "12345678",
                800,
                null
            ));
            System.out.println("✅ Hoteles iniciales cargados en la base de datos con exito.");
        } else {
            System.out.println("👍 Los hoteles ya existen en la base de datos.");
        }
        
        //** SUCURSALES INICIALES **/
        if (sucursalRepository.count() == 0) {
            sucursalRepository.save(new Sucursal(
                null,
                "Diagonal 456",
                "cv.laplata@gmail.com",
                "12345678",
                null
            ));
            sucursalRepository.save(new Sucursal(
                null,
                "Recta 109",
                "cv.lapaz@gmail.com",
                "12345678",
                null
            ));
            sucursalRepository.save(new Sucursal(
                null,
                "Av. julia 4896",
                "cv.mardelplata@gmail.com",
                "12345678",
                null
            ));
            System.out.println("✅ Sucursales iniciales cargados en la base de datos con exito.");
        } else {
            System.out.println("👍 Los sucursales ya existen en la base de datos.");
        }

        //** VUELOS INICIALES **/
        if (vueloRepository.count() == 0) {
            vueloRepository.save(new Vuelo(
                null,
                LocalDate.of(2025, 3, 15),
                LocalDateTime.now(),
                "La plata",
                "Nueva Zelanda",
                150,
                130,
                null
            ));
            vueloRepository.save(new Vuelo(
                null,
                LocalDate.of(2025, 8, 22),
                LocalDateTime.now(),
                "Irlanda",
                "Buenos Aires",
                150,
                130,
                null
            ));
            vueloRepository.save(new Vuelo(
                null,
                LocalDate.of(2025, 5, 10),
                LocalDateTime.now(),
                "Nueva York",
                "Inglaterra",
                150,
                130,
                null
            ));
            System.out.println("✅ Vuelos iniciales cargados en la base de datos con exito.");
        } else {
            System.out.println("👍 Los vuelos ya existen en la base de datos.");
        }
    }
}