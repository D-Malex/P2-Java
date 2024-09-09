package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.IOException;
import java.io.Serializable;

public abstract class Usuario implements Serializable {

    //ATRIBUTOS
    private String nombre;
    private String apellido;
    private String id;
    private String clave;
    private String rol;
    private String direccion;
    private String email;
    private String telefono;

    //CONSTRUCTOR
    public Usuario(String nombre, String apellido, String id,
            String clave, String rol, String direccion, String email,
            String telefono) {
        this.nombre = nombre;       //Not Null
        this.apellido = apellido;   //Not Null
        this.id = id;               //Not Null + Incremental
        this.clave = clave;         //Not Null
        this.rol= rol;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
    }
    public Usuario() {
    }

    //METODOS
    public abstract void mostrarMenuPrincipal(Empresa Cv);

    public String getNombe() {
        return nombre;
    }
    public String getApellido() {
        return apellido;
    }
    public String getId() {
        return id;
    }
    public String getClave() {
        return clave;
    }
    public String getDireccion() {
        return direccion;
    }
    public String getEmail() {
        return email;
    }
    public String getRol() {
        return rol;
    }
    public String getTelefono() {
        return telefono;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setClave(String clave) {
        this.clave = clave;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
   
    public void getInfPersonal() {
        mostrarConSalto("\nINFORMACION PERSONAL"
                + "\n* Codigo: " + id
                + "\n* Nombre y Apellido: " + nombre + " " + apellido
                + "\n* Contraseña: " + clave + "\n* Email: " + email
                + "\n* Direccion: " + direccion + "\n* Telefono: " + telefono);
    }
    
    
    public void editInfPersonal(Empresa Cv) throws IOException {
        getInfPersonal();
        int op = 0; String nuevo = "";
        do {
            op = leerEntero("\nQue desea modificar?"
                    + "\n[1] Nombre"
                    + "\n[2] Apellido"
                    + "\n[3] Id"
                    + "\n[4] Clave"
                    + "\n[5] Direccion"
                    + "\n[6] Email"
                    + "\n[7] Telefono");
        } while (op > 7 || op < 1);
        
        switch (op) {
                    case 1:
                        nuevo = leerStringValid("Nombre: ");
                        setNombre(nuevo);
                        break;
                    case 2:
                        nuevo = leerStringValid("Apellido: ");
                        setApellido(nuevo);
                        break;
                    case 3:
                        nuevo = leerStringValid("Id: ");
                        setId(nuevo);
                        break;
                    case 4:
                        nuevo = leerStringValid("Clave: ");
                        setClave(nuevo);
                        break;
                    case 5:
                        nuevo = leerStringValid("Direccion: ");
                        setDireccion(nuevo);
                        break;
                    case 6:
                        nuevo = leerStringValid("Email: ");
                        setEmail(nuevo);
                        break;
                    case 7:
                        nuevo = leerStringValid("Telefono: ");
                        setTelefono(nuevo);
                        break;
        }
        
        Cv.serializar("BaseDeUsuarios.txt");
    }
    
    
    
    public void getInfoUsuario(Empresa Cv) {
        if (Cv.hayUsuario("CLIENTE")) {
            Cliente c = (Cliente) Cv.listarEncontrar("CLIENTE");
            if (c != null) {
                c.getInfCliente();
            } else {
                mostrar("ERROR: No se encontro al usuario.");
            }
        } else {
            mostrar("ERROR: No hay clientes guardados.");
        }
    }
    
    public void getInfoUsuario(Empresa Cv, String rol) {
        if (Cv.hayUsuario(rol)) {
            Usuario u = Cv.listarEncontrar(rol);
            if (u != null) {
                u.getInfPersonal();
            } else {
                mostrar("ERROR: No se encontro al usuario.");
            }
        } else {
            mostrar("ERROR: No hay usuarios guardados.");
        }
    }
    
    public void modificarUsuario(Empresa Cv, String rol) throws IOException {
        if (Cv.hayUsuario(rol)) {
            Usuario u = Cv.listarEncontrar(rol);
            
            if (u != null) {
                u.getInfPersonal();

                int op = 0;
                String nuevo = "";
                do {
                    op = leerEntero("\nQue desea modificar?"
                            + "\n[1] Nombre"
                            + "\n[2] Apellido"
                            + "\n[3] Id"
                            + "\n[4] Direccion"
                            + "\n[5] Email"
                            + "\n[6] Telefono");
                } while (op > 6 || op < 1);

                switch (op) {
                    case 1:
                        nuevo = leerStringValid("Nombre: ");
                        u.setNombre(nuevo);
                        break;
                    case 2:
                        nuevo = leerStringValid("Apellido: ");
                        u.setApellido(nuevo);
                        break;
                    case 3:
                        nuevo = leerStringValid("Id: ");
                        u.setId(nuevo);
                        break;
                    case 4:
                        nuevo = leerStringValid("Direccion: ");
                        u.setDireccion(nuevo);
                        break;
                    case 5:
                        nuevo = leerStringValid("Email: ");
                        u.setEmail(nuevo);
                        break;
                    case 6:
                        nuevo = leerStringValid("Telefono: ");
                        u.setTelefono(nuevo);
                        break;
                }
            } else {
                mostrar("ERROR: Ese ID no coincide con ningun usuario.");
            }
        } else {
            mostrar("ERROR: No hay "+ rol +"/ES cargados.");
        }
    Cv.serializar("BaseDeUsuarios.txt");
    }
        
    public void aniadirAdmin(Empresa Cv) throws IOException{
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

        Cv.agregarUsuario(new Administrador(nombre, apellido, id, clave, direc, email, telefono));
        
        Cv.serializar("BaseDeUsuarios.txt");
    }
    public void aniadirVendedor(Empresa Cv) throws IOException{
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

        Cv.agregarUsuario(new Vendedor(nombre, apellido, id, clave, direc, email, telefono));
        
        Cv.serializar("BaseDeUsuarios.txt");
    }
    
    
}
