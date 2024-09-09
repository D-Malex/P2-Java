package columbiaviajes;

import java.io.IOException;
import java.io.Serializable;
import java.util.Scanner;

public class EntradaSalida implements Serializable {

    //MUESTRA
    public static void mostrarMenuLogin() throws IOException, ClassNotFoundException {
        mostrarConSalto("Bienvenido al sistema de COLUMBIA VIAJES");
        String id = leerString("\nIngrese su ID: ");
        String clave = leerString("Ingrese Su Clave: ");
        linea(80);

        Empresa Cv = new Empresa();
        try {
            Cv = Cv.deSerializar("BaseDeUsuarios.txt");
        } catch(IOException | ClassNotFoundException e) {
            Cv.agregarDuenio(new Duenio("Matias", "Seba Mallo", "3319", "Jefecito", "Aguirre 623", "elDuenio@gmail.com", "45632158"));
            Cv.serializar("BaseDeUsuarios.txt");
            mostrar("ERROR: No se pudo obtener la informacion guardada\n");
        }
        Usuario u = Cv.validarUsuario(id + ":" + clave);

        if (u == null) {
            mostrarConSalto("ERROR: La combinacion ID/Clave ingresada no es correcta.");
        } else {
            mostrarConSalto("La validacion se realizo correctamente...");
            mostrar("Bienvenido " + u.getNombe() + ", como puedo serte util?");
            u.mostrarMenuPrincipal(Cv);
        }
    }

    public static void mostrarMenuLogin(Empresa Cv) throws IOException, ClassNotFoundException {
        mostrarConSalto("Bienvenido al sistema de COLUMBIA VIAJES");
        String id = leerString("\nIngrese su ID: ");
        String clave = leerString("Ingrese Su Clave: ");
        linea(80);
        
        try {
            Cv = Cv.deSerializar("BaseDeUsuarios.txt");
        } catch(IOException | ClassNotFoundException e) {
            mostrar("ERROR: No se pudo obtener la informacion guardada\n");
        }
        Usuario u = Cv.validarUsuario(id + ":" + clave);

        if (u == null) {
            mostrarConSalto("ERROR: La combinacion ID/Clave ingresada no es correcta.");
            mostrarMenuLogin(Cv);
        } else {
            mostrarConSalto("La validacion se realizo correctamente...");
            mostrar("Bienvenido " + u.getNombe() + ", como puedo serte util?");
            u.mostrarMenuPrincipal(Cv);
        }
    }
    
    public static void mostrar(String mensaje) {
        System.out.printf(mensaje);
    }

    public static void mostrarConSalto(String mensaje) {
        System.out.println(mensaje);
    }

    public static void linea(int n) {
        mostrarConSalto("");
        for (int i = 0; i < n; i++) {
            mostrar("-");
        }
        mostrar("\n");
    }

    //LECTURA
    public static String leerString(String mensaje) {
        Scanner input = new Scanner(System.in);
        mostrar(mensaje);
        return input.nextLine();
    }
    
    public static String leerStringValid(String mensaje) {
        Scanner input = new Scanner(System.in);
        String s;
        do {
            mostrar(mensaje);
            s = input.nextLine();
        }while(s.isEmpty());
        return s;
    }

    public static boolean leerBoolean(String mensaje) {
        int n = -1;
        Scanner s = new Scanner(System.in);
        mostrarConSalto(mensaje);
        while (n != 1 && n != 0) {
            mostrar("Ingrese 1 para SI o ingrese 0 para NO: ");
            n = s.nextInt();
        }
        return (n == 1) ? true : false;
    }

    public static int leerEntero(String mensaje) {
        Scanner s = new Scanner(System.in);
        mostrarConSalto(mensaje);
        return s.nextInt();
    }

    public static float leerFlotante(String mensaje) {
        Scanner s = new Scanner(System.in);
        mostrarConSalto(mensaje);
        return Float.parseFloat(s.nextLine());
    }
}
