package com.columbiaviajes.dto;

import com.columbiaviajes.models.Hotel;
import com.columbiaviajes.models.Vuelo;

public class PaqueteDTO {
    private Hotel hotel;
    private Vuelo vuelo;

    // Constructor vacío
    public PaqueteDTO() {
    }

    // Constructor con parámetros
    public PaqueteDTO(Hotel hotel, Vuelo vuelo) {
        this.hotel = hotel;
        this.vuelo = vuelo;
    }

    // Getters y setters
    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Vuelo getVuelo() {
        return vuelo;
    }

    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }
}
