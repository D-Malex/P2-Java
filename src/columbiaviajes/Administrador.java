package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Administrador extends Usuario implements Serializable {
    
    public Administrador(String nombre, String apellido, String id, String clave,String direccion, String email, String telefono) {
        super(nombre, apellido, id, clave, "ADMINISTRADOR", direccion, email, telefono);
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
                    
                    + "\n\n[3] Informacion de VENDEDOR."
                    + "\n[4] Aniadir VENDEDOR."
                    + "\n[5] Editar VENDEDOR."
                    
                    + "\n\n[6] Informacion de CLIENTE."
                    + "\n\n[0] Salir.");
        } while (op > 6 || op < 0);

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
                getInfoUsuario(Cv, "VENDEDOR");
                mostrarMenuPrincipal(Cv);
                
            case 4:
                linea(80);
                try {
                    aniadirVendedor(Cv);
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 5:
                linea(80);
                try {
                    modificarUsuario(Cv, "VENDEDOR");
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 6:
                linea(80);
                getInfoUsuario(Cv, "CLIENTE");
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
}
