package columbiaviajes;

import static columbiaviajes.EntradaSalida.mostrar;
import java.io.Serializable;

public class Sucursal implements Serializable{

    //ATRIBUTOS
    private String code;
    private String direccion;
    private String email;
    private String telefono;

    //CONSTRUCTOR
    public Sucursal(String code, String direccion, String email, String telefono) {
        this.code = code;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
    }

    public void getInfSucursal() {
        mostrar("Code: " + code 
                + "\nDireccion: " + direccion 
                + "\nEmail: " + email 
                + "\nTelefono: " + telefono + "\n");
    }

    public String getCode() {
        return code;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefono() {
        return telefono;
    }
    
    
}
