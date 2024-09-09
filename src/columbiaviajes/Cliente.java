package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Cliente extends Usuario  implements Serializable {
    
    private Sucursal sucursalAsigned;
    private Vuelo vueloAsigned;
    private Hotel hotelAsigned;
    
    public Cliente(String nombre, String apellido, String id, String clave, String direccion, String email, String telefono, Sucursal sucursal, Hotel hotel, Vuelo vuelo) {
        super(nombre, apellido, id, clave, "CLIENTE", direccion, email, telefono);
        this.sucursalAsigned = sucursal;
        this.hotelAsigned = hotel;
        this.vueloAsigned = vuelo;
    }

    @Override
    public void mostrarMenuPrincipal(Empresa Cv) {
        try {
            Cv.deSerializar("BaseDeUsuarios.txt");
        } catch (IOException ex) {
            Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
        }

        int op = 0;
        linea(80);
        mostrar("\n");

        do {
            op = leerEntero("MENU PRINCIPAL"
                    + "\n[1] Informacion PERSONAL."
                    + "\n[2] Editar Perfil."
                    
                    + "\n\n[3] Consultar SUCURSAL."
                    + "\n[4] Consultar HOTEL."
                    + "\n[5] Consultar VUELO."
                    
                    + "\n\n[0] Salir.");
        } while (op > 5 || op < 0);

        switch (op) {
            case 1:
                linea(80);
                getInfPersonal();
                mostrarMenuPrincipal(Cv);
                
            case 2:
                linea(80);
                try {
                    editInfPersonal(Cv);
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
            
            case 3:
                linea(80);
                if(sucursalAsigned == null){
                    mostrar("No tiene ninguna sucursal asignada.");
                } else {
                    sucursalAsigned.getInfSucursal();
                }
                mostrarMenuPrincipal(Cv);
                        
            case 4:
                linea(80);
                if(hotelAsigned == null){
                    mostrar("No tiene ningun Hotel asignado.");
                } else {
                    hotelAsigned.infoHotel(); 
                }
                mostrarMenuPrincipal(Cv);
                
            case 5:
                linea(80);
                if(vueloAsigned == null){
                    mostrar("No tiene ningun vuelo asignado.");
                } else {
                    vueloAsigned.infoVuelo();
                }
                
                mostrarMenuPrincipal(Cv);
                
            case 0:
                linea(80);
                try {
                    Cv.serializar("BaseDeUsuarios.txt");
                } catch (IOException ex) {
                    Logger.getLogger(Cliente.class.getName()).log(Level.SEVERE, null, ex);
                }
                try {
                    mostrarMenuLogin(Cv);
                } catch (IOException ex) {
                    Logger.getLogger(Administrador.class.getName()).log(Level.SEVERE, null, ex);
                } catch (ClassNotFoundException ex) {
                    Logger.getLogger(Administrador.class.getName()).log(Level.SEVERE, null, ex);
                }             
             
        }
    }
    
    public void setVuelo(Vuelo vuelo) {
        this.vueloAsigned = vuelo;
    }
    
    public void setHotel(Hotel hotel) {
        this.hotelAsigned = hotel;
    }
    
    public void setSucursal(Sucursal sucursal) {
        this.sucursalAsigned = sucursal;
    }

    public void getInfCliente() {
        getInfPersonal();
        mostrar("Sucursal: " + sucursalAsigned.getCode() + "\nHotel: " + hotelAsigned.getNombre() 
                + "\nVuelo: " + vueloAsigned.getNumeroVuelo());
    }
}
