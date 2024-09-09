package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Duenio extends Usuario implements Serializable {

    //CONSTRUCTOR
    public Duenio(String nombre, String apellido, String id, String clave, String direccion, String email, String telefono) {
        super(nombre, apellido, id, clave, "DUENIO", direccion, email, telefono);
    }

    //METODOS
    @Override
    public void mostrarMenuPrincipal(Empresa Cv) {
        try {
            Cv.deSerializar("BaseDeUsuarios.txt");          //Obtiene informacion del archivo BBDD.
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
                    + "\n[2] Aniadir DUENIO."
                    + "\n[3] Informacion CODUENIO."
                    + "\n[4] Editar Perfil."
                    
                    + "\n\n[5] Informacion de ADMINISTRADOR."
                    + "\n[6] Aniadir ADMINISTRADOR."
                    + "\n[7] Editar ADMINISTRADOR."
                    
                    + "\n\n[8] Agregar SUCURSAL."
                    + "\n[9] Listar SUCURSALES."
                    
                    + "\n\n[10] Agregar VUELO."
                    + "\n[11] Listar VUELOS."
                    
                    + "\n\n[12] Agregar HOTEL."
                    + "\n[13] Listar HOTELES."
                    
                    + "\n\n[14] Listado de VENDEDORES."
                    + "\n[0] Salir.");
        } while (op > 14 || op < 0);

        switch (op) {

            case 1:
                linea(80);
                getInfPersonal();
                mostrarMenuPrincipal(Cv);
            
            case 2:
                linea(80);
                try {
                    aniadirDuenio(Cv);      //Puede agregar Coduenios
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 3:
                linea(80);
                getInfoUsuario(Cv, "DUENIO");    //Te muestra los administradores
                mostrarMenuPrincipal(Cv);
            
            case 4:
                linea(80);
                try {
                    editInfPersonal(Cv);        //Puede editar su Informacion
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 5:
                linea(80);
                getInfoUsuario(Cv, "ADMINISTRADOR");    //Te muestra los administradores
                mostrarMenuPrincipal(Cv);

            case 6:
                linea(80);
                try {
                    aniadirAdmin(Cv);           //Agrega nuevos Administadores
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);

            case 7:
                linea(80);
                try {
                    modificarUsuario(Cv, "ADMINISTRADOR");      //Edita un administrador
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 8:
                linea(80);
                Cv.listarSucursales();
                try {
                    agregarSucursal(Cv);
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 9:
                linea(80);
                Cv.listarSucursales();
                mostrarMenuPrincipal(Cv);
                
            case 10:
                linea(80);
                Cv.listarVuelos();
                try {
                    agregarVuelo(Cv);       //Crea un Vuelo 
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);

            case 11:
                linea(80);
                Cv.listarVuelos();
                mostrarMenuPrincipal(Cv);
                
            case 12:
                linea(80);
                Cv.listarHoteles();
                try {
                    agregarHotel(Cv);
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);
                
            case 13:
                linea(80);
                Cv.listarHoteles();
                mostrarMenuPrincipal(Cv);
                
            case 14:
                linea(80);
                try {
                    Cv.OrdenarVendedores();
                } catch (IOException ex) {
                    Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
                }
                mostrarMenuPrincipal(Cv);

            case 0:
                try {
                Cv.serializar("BaseDeUsuarios.txt");
            } catch (IOException ex) {
                Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);
            }
            System.exit(0);
        }
    }

    public void aniadirDuenio(Empresa Cv) throws IOException{
        mostrarConSalto("Perfecto! ahora necesito que ingreses los datos del nuevo Usuario.\n");

        String nombre = leerStringValid("Nombre: ");
        String apellido = leerStringValid("Apellido: ");
        String direc = leerStringValid("Direccion: ");
        String email = leerStringValid("email: ");
        String telefono = leerStringValid("telefono: ");
        mostrar("Muy bien! los siguientes datos son MUY IMPORTANTES.\n");
        String id;
        do {
            id = leerStringValid("Numero de Identificacion Unico: ");
        }while(Cv.validarId(id));
        
        String clave = leerStringValid("Contraseña: ");

        Cv.agregarUsuario(new Duenio(nombre, apellido, id, clave, direc, email, telefono));
        
        Cv.serializar("BaseDeUsuarios.txt");
    }   
    public void agregarVuelo(Empresa Cv) throws IOException {
        mostrar("\nAgrege a la lista otro vuelo.\n");
        int numeroVuelo;
        do{
                numeroVuelo = leerEntero("Ingrese el numero de vuelo: ");
        } while(Cv.validarVl(numeroVuelo));
        
        String fecha = leerStringValid("Fecha: ");
        String origen = leerStringValid("Origen: "); 
        String destino = leerStringValid("Destino: "); 
        int plazasTotales = leerEntero("Plazas Totales: ");
        int plazasTurista = leerEntero("Plazaas en Turista: ");
        float precio = leerFlotante("Precio: ");
        
        Cv.agregarVuelo(new Vuelo(numeroVuelo, fecha, fecha, origen, destino, plazasTotales, plazasTurista, precio));
        Cv.serializar("BaseDeUsuarios.txt");
    } 
    public void agregarHotel(Empresa Cv) throws IOException {
        mostrar("Agregue a la lista otro hotel.\n");
        String nombre;
        do {
            nombre = leerStringValid("Ingrese el nombre del Hotel: ");
        } while(Cv.validarHt(nombre));
        
        
        String direccion = leerStringValid("Direccion: ");
        String ciudad = leerStringValid("Ciudad: ");
        String telefono = leerStringValid("Telefono: ");
        int plazas = leerEntero("Plazas Disponibles: ");
        float precio = leerFlotante("Precio: ");
        
        Cv.agregarHotel(new Hotel(nombre, direccion, ciudad, telefono, plazas, precio));
        Cv.serializar("BaseDeUsuarios.txt");
    }
    public void agregarSucursal(Empresa Cv) throws IOException {
        mostrar("Agregue a la lista otro Sucursales.\n");
        String nombre;
        do {
            nombre = leerStringValid("Ingrese el codigo de sucursal: ");
        } while(Cv.validarSc(nombre));
        
        String direccion = leerStringValid("Direccion: ");
        String telefono = leerStringValid("Telefono: ");
        String email = leerStringValid("Email: ");
        
        
        Cv.agregarSucursal(new Sucursal(nombre, direccion, email, telefono));
        Cv.serializar("BaseDeUsuarios.txt");
    }
    
    private void mostrarLista(ArrayList<Vendedor> vendedores) {
        for (Vendedor v : vendedores) {
            v.getFacturacionReduce();
        }
    }
}
    