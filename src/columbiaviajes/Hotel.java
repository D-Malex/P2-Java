
package columbiaviajes;

import static columbiaviajes.EntradaSalida.mostrarConSalto;
import java.io.Serializable;

public class Hotel implements Serializable{
    
    //ATRIBUTOS
    private String nombre;
    private String dirección;
    private String ciudad;
    private String teléfono; 
    private int plazasDisponibles;
    private float precio;
    
    //CONSTRUCTOR
    public Hotel(String nombre, String dirección, String ciudad, String teléfono, int plazasDisponibles, float precio) {
        this.nombre = nombre;
        this.dirección = dirección;
        this.ciudad = ciudad;
        this.teléfono = teléfono;
        this.plazasDisponibles = plazasDisponibles;
        this.precio = precio;
    }
    
    //METODOS
    public void infoHotel() {
        mostrarConSalto(
                "Nombre: " + getNombre()
                + "\nCiudad: " + getCiudad() + ".  Direccion: " + getDirección() 
                + "\nTelefono: " + getTeléfono() 
                + "\nPlazasDisponibles: " + getPlazasDisponibles() 
                + "\nPrecio: $" + precio); 
    }
    
    public String getNombre() {
        return nombre;
    }

    public String getDirección() {
        return dirección;
    }

    public String getCiudad() {
        return ciudad;
    }

    public String getTeléfono() {
        return teléfono;
    }

    public int getPlazasDisponibles() {
        return plazasDisponibles;
    }

    public float getPrecio() {
        return precio;
    }
    
}
