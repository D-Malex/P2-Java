package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Vendedor extends Usuario  implements Serializable {
   
        private float facturacion = 0;
    
    public Vendedor(String nombre, String apellido, String id, String clave, String direccion, String email, String telefono) {
        super(nombre, apellido, id, clave, "VENDEDOR", direccion, email, telefono);
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
                    
                    + "\n\n[3] Informacion de CLIENTE."
                    + "\n[4] Vender"
                  
                    + "\n\n[0] Salir.");
        } while (op > 4 || op < 0);

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
                getInfoCliente(Cv);
                
                mostrarMenuPrincipal(Cv);
                
            case 4:
                linea(80);
                boolean entrar = leerBoolean("Desea ingresar un cliente existente?");
                if(entrar) {
                    try {
                        venderaCliente(Cv);
                    } catch (IOException ex) {
                        Logger.getLogger(Vendedor.class.getName()).log(Level.SEVERE, null, ex);
                    }
                } else {
                    try {
                        aniadirCliente(Cv);
                    } catch (IOException ex) {Logger.getLogger(Duenio.class.getName()).log(Level.SEVERE, null, ex);}
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

    public void getInfoCliente(Empresa Cv) {
        if (Cv.hayUsuario("CLIENTE")) {
            Cliente c = (Cliente) Cv.listarEncontrar("CLIENTE");
            if (c != null) {
                c.getInfCliente();
            } else {
                mostrar("ERROR: No se encontro al Cliente.");
            }
        } else {
            mostrar("ERROR: No hay clientes guardados.");
        }
    }
    
    public void venderaCliente(Empresa Cv) throws IOException {
        Usuario u = null; 
        
        do {
            String code = leerStringValid("Ingrese el ID del cliente: ");
            u = Cv.buscarUsuario(code);
            if(u == null) {
                mostrar("ERROR: No se encontro al usuario.");
                mostrarMenuPrincipal(Cv);
            }
        } while(!(u instanceof Cliente));
        Cliente c = (Cliente) u;
         
        //ELEGI UNA SUCURSAL
        Sucursal suc = null;
        do {
            mostrar("\n\n");
            Cv.listarSucursales();
            String numero = leerStringValid("\nIngrese el codigo de sucursal que desea asignar: ");
            suc = Cv.buscarSucursal(numero);
        } while(suc == null);
        c.setSucursal(suc);
        
        //ELEGI UN HOTEL
        Hotel hotel = null;
        do {
            mostrar("\n\n");
            Cv.listarHoteles(); String nombr = leerStringValid("\nIngrese el nombre del hotel que desea asignar: ");
            hotel = Cv.buscarHotel(nombr);
        } while(hotel == null);
        c.setHotel(hotel);
        
        //ELEGI UN VUELO
        Vuelo vuelo = null;
        do {
            mostrar("\n\n");
            Cv.listarVuelos(); int numero = leerEntero("\nIngrese el numero de vuelo que desea asignar: ");
            vuelo = Cv.buscarVuelo(numero);
        } while(vuelo == null);
        c.setVuelo(vuelo);
        
        facturacion += vuelo.getPrecio();
        facturacion += hotel.getPrecio()/3;
        
        Cv.serializar("BaseDeUsuarios.txt");
    }
    
    public void aniadirCliente(Empresa Cv) throws IOException{
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
        
        //ELEGI UNA SUCURSAL
        Sucursal suc = null;
        do {
            mostrar("\n\n");
            Cv.listarSucursales();
            String numero = leerStringValid("\nIngrese el codigo de sucursal que desea asignar: ");
            suc = Cv.buscarSucursal(numero);
        } while(suc == null);
        
        //ELEGI UN HOTEL
        Hotel hotel = null;
        do {
            mostrar("\n\n");
            Cv.listarHoteles(); String nombr = leerStringValid("\nIngrese el nombre del hotel que desea asignar: ");
            hotel = Cv.buscarHotel(nombr);
        } while(hotel == null);
        
        //ELEGI UN VUELO
        Vuelo vuelo = null;
        do {
            mostrar("\n\n");
            Cv.listarVuelos(); int numero = leerEntero("\nIngrese el numero de vuelo que desea asignar: ");
            vuelo = Cv.buscarVuelo(numero);
        } while(vuelo == null);

        Cv.agregarUsuario(new Cliente(nombre, apellido, id, clave, direc, email, telefono, suc, hotel, vuelo));
        
        facturacion += vuelo.getPrecio();
        facturacion += hotel.getPrecio()/3;        
        
        Cv.serializar("BaseDeUsuarios.txt");
    }
    
    public float getFacturacion() {
        return facturacion;
    }
    
    public void getFacturacionReduce() {
        mostrarConSalto(getId() + ": " + getNombe()+ " $" + getFacturacion());
    }
}
