package columbiaviajes;

import static columbiaviajes.EntradaSalida.*;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

public class Empresa implements Serializable {

    //LISTAS DE DATOS
    private ArrayList<Usuario> usuarios;
    private ArrayList<Sucursal> sucursales;
    private ArrayList<Vuelo> vuelos;
    private ArrayList<Hotel> hoteles;

    //CONSTRUCTOR
    public Empresa() throws IOException {
        usuarios = new ArrayList<Usuario>();
        sucursales = new ArrayList<Sucursal>();
        vuelos = new ArrayList<Vuelo>();
        hoteles = new ArrayList<Hotel>();
    }

    //GUARDAR EB ARCHIVO
    public void serializar(String a) throws IOException {
        FileOutputStream f = new FileOutputStream(a);
        ObjectOutputStream o = new ObjectOutputStream(f);
        o.writeObject(this);
        o.close();
    }

    //RECUPERAR DEL ARCHIVO
    public Empresa deSerializar(String a) throws IOException, ClassNotFoundException {
        FileInputStream f = new FileInputStream(a);
        ObjectInputStream o = new ObjectInputStream(f);
        Empresa s = (Empresa) o.readObject();
        o.close();
        return s;
    }

    //Adiciones a la BBDD
    public void agregarUsuario(Usuario usuario) {
        usuarios.add(usuario);
    }

    public void agregarSucursal(Sucursal sucursal) {
        sucursales.add(sucursal);
    }

    public void agregarVuelo(Vuelo vuelo) {
        vuelos.add(vuelo);
    }

    public void agregarHotel(Hotel hotel) {
        hoteles.add(hotel);
    }

    //Listas
    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

    public ArrayList<Sucursal> getSucursales() {
        return sucursales;
    }

    public ArrayList<Vuelo> getVuelos() {
        return vuelos;
    }

    public ArrayList<Hotel> getHoteles() {
        return hoteles;
    }
    
    public void OrdenarVendedores() throws IOException {
        float max = -1; int contador = 0;
        
        for (Usuario u : usuarios) {
            if (u.getRol().equals("VENDEDOR")) {
                contador++;
            }
        }
        
        for (int i = 0; i < contador; i++) {
            for (Usuario u : usuarios) {
                if (u.getRol().equals("VENDEDOR")) { //FILTRO PARA SOLO LOS VENDEDORES
                    Vendedor v = (Vendedor) u;
                    if(v.getFacturacion() == max) {
                        
                    } else {
                        if(v.getFacturacion() > max) {
                            max = v.getFacturacion();
                        } 
                    }
                }
            }
            //v.getFacturacionReduce();
        }
    }

    public ArrayList<Usuario> getUsuarios(String rol) {
        ArrayList<Usuario> especificos = new ArrayList<Usuario>();

        for (Usuario u : usuarios) {
            if (u.getRol().equals(rol)) {
                especificos.add(u);
            }
        }
        return especificos;
    }  //Lista los ususarios de cierto rol

    public void listarUsuarios() {
        for (Usuario u : usuarios) {
            u.getInfPersonal();
        }
    }

    public void listarSucursales() {
        mostrar("Listado de Sucursales \n:");
        for (Sucursal s : sucursales) {
            s.getInfSucursal();
            mostrar("\n");
        }
        mostrar("\n\n");
    }

    public void listarVuelos() {
        mostrar("Listado de Vuelos: \n");
        for (Vuelo v : vuelos) {
            v.infoVuelo();
            mostrar("\n");
        }
    }

    public void listarHoteles() {
        mostrar("Listado de Hoteles: \n");
        for (Hotel h : hoteles) {
            h.infoHotel();
            mostrar("\n");
        }
    }

    public void listarUsuarios(String rol) {
        for (Usuario u : usuarios) {
            if (u.getRol().equals(rol)) {
                mostrar(u.getId() + ": " + u.getNombe() + " " + u.getApellido() + "\n");
            }
        }
    }        //lista reducida

    public Usuario validarUsuario(String IdClave) {
        int i = 0;
        boolean encontrado = false;
        Usuario u = null;

        while (i < usuarios.size() && !encontrado) {
            u = usuarios.get(i);
            if (IdClave.equals(u.getId() + ":" + u.getClave())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (!encontrado) {
            return null;
        } else {
            return u;
        }
    }

    public boolean validarId(String id) {
        int i = 0;
        boolean encontrado = false;
        Usuario u = null;

        while (i < usuarios.size() && !encontrado) {
            u = usuarios.get(i);
            if (id.equals(u.getId())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado;
    }

    public boolean validarVl(int N) {
        int i = 0;
        boolean encontrado = false;
        Vuelo v = null;

        while (i < vuelos.size() && !encontrado) {
            v = vuelos.get(i);
            if (N == v.getNumeroVuelo()) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado;
    }

    public boolean validarHt(String N) {
        int i = 0;
        boolean encontrado = false;
        Hotel h = null;

        while (i < hoteles.size() && !encontrado) {
            h = hoteles.get(i);
            if (N.equals(h.getNombre())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado;
    }

    public boolean validarSc(String code) {
        int i = 0;
        boolean encontrado = false;
        Sucursal s = null;

        while (i < sucursales.size() && !encontrado) {
            s = sucursales.get(i);
            if (code.equals(s.getCode())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        return encontrado;
    }

    public boolean hayUsuario(String rol) {
        for (Usuario u : usuarios) {
            if (u.getRol().equals(rol)) {
                return true;
            }
        }
        return false;
    }

    //BUSQUEDA  
    public Usuario buscarUsuario(String ID) {
        int i = 0;
        boolean encontrado = false;
        Usuario u = null;

        while (i < usuarios.size() && !encontrado) {
            u = usuarios.get(i);
            if (ID.equals(u.getId())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (!encontrado) {
            return null;
        } else {
            return u;
        }
    }

    public Sucursal buscarSucursal(String code) {
        int i = 0;
        boolean encontrado = false;
        Sucursal s = null;

        while (i < sucursales.size() && !encontrado) {
            s = sucursales.get(i);
            if (code.equals(s.getCode())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (!encontrado) {
            return null;
        } else {
            return s;
        }
    }

    public Vuelo buscarVuelo(int number) {
        int i = 0;
        boolean encontrado = false;
        Vuelo v = null;

        while (i < vuelos.size() && !encontrado) {
            v = vuelos.get(i);
            if (number == v.getNumeroVuelo()) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (!encontrado) {
            return null;
        } else {
            return v;
        }
    }

    public Hotel buscarHotel(String nombre) {
        int i = 0;
        boolean encontrado = false;
        Hotel h = null;

        while (i < hoteles.size() && !encontrado) {
            h = hoteles.get(i);
            if (nombre.equals(h.getNombre())) {
                encontrado = true;
            } else {
                i++;
            }
        }
        if (!encontrado) {
            return null;
        } else {
            return h;
        }
    }

    public Usuario listarEncontrar(String rol) {
        listarUsuarios(rol);
        String code = leerStringValid("Ingrese ID del usuario que desea revisar: ");
        Usuario u = buscarUsuario(code);
        return u;
    }
    
    public void agregarDuenio(Duenio duenio) {
        usuarios.add(duenio);
    }
}
