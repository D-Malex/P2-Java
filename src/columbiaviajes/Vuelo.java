package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.Serializable;

public class Vuelo implements Serializable {

    //ATRIBUTOS
    private int numeroVuelo;
    private String fecha;
    //private String hora; 
    private String origen;
    private String destino;
    private int plazasTotales;
    private int plazasTurista;
    private float precio;

    //CONSTRUCTOR
    public Vuelo(int numeroVuelo, String fecha, String hora, String origen, String destino, int plazasTotales, int plazasTurista, float precio) {
        this.numeroVuelo = numeroVuelo;
        this.fecha = fecha;
        this.origen = origen;
        this.destino = destino;
        this.plazasTotales = plazasTotales;
        this.plazasTurista = plazasTurista;
        this.precio = precio;
    }

    public void infoVuelo() {
        mostrarConSalto(
                "N: " + getNumeroVuelo() 
                + "\nDe: " + getOrigen() + ".   Hasta: " + getDestino() 
                + "\nPlazas: " + getPlazasTotales()
                + "\nPrecio: $" + precio);
    }

    public int getNumeroVuelo() {
        return numeroVuelo;
    }

    public String getFecha() {
        return fecha;
    }

    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public int getPlazasTotales() {
        return plazasTotales;
    }

    public int getPlazasTurista() {
        return plazasTurista;
    }

    public float getPrecio() {
        return precio;
    }

}
