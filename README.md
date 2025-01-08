# Proyecto Columbia Viajes

## Descripción

Columbia Viajes es una aplicación web para la gestión de una empresa de viajes. Este proyecto fue desarrollado como trabajo final para la materia Programación 2. La aplicación permite gestionar usuarios, roles y viajes, cumpliendo con los requerimientos especificados en el documento de requerimientos.

## Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.3.2**
  - Spring Boot Starter Data JPA
  - Spring Boot Starter Security
  - Spring Boot Starter Web
  - Spring Boot Starter Validation
  - Spring Boot DevTools
- **MySQL**
- **Lombok**
- **JWT (JSON Web Tokens)**
- **Maven**

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

### ColumbiaViajes

- **src/main/java/com/madev/ColumbiaViajes**: Contiene el código fuente de la aplicación.
- **src/main/resources**: Contiene los archivos de configuración y recursos estáticos.
- **pom.xml**: Archivo de configuración de Maven.

### Diagramas

En la carpeta `Diagramas` se encuentran los diagramas de Entidad-Relación en distintos formatos:

- **Diagrama_ER.mwb**: Formato de MySQL Workbench.
- **ER.drawio**: Formato editable de draw.io.
- **ER.png**: Imagen del diagrama en formato PNG.
- **ER.pdf**: Documento PDF del diagrama.

### Requerimientos

El archivo `Requerimientos.txt` contiene las consignas del proyecto, las cuales fueron implementadas de la siguiente manera:

1. **Modelo MVC**: La aplicación sigue el patrón de diseño Modelo-Vista-Controlador.
2. **Aplicación Web**: La aplicación es accesible a través de un navegador web.
3. **Base de Datos**: La base de datos está almacenada en un servidor MySQL.
4. **Ejecución del Programa**: El programa se ejecuta en un servidor de aplicaciones Spring Boot.
5. **Pruebas en Dispositivos**: La aplicación fue probada en múltiples dispositivos para asegurar su correcto funcionamiento.

## Instalación y Ejecución

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd ColumbiaViajes
   ```
3. Configura la base de datos en `src/main/resources/application.properties`:
   ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/columbia_viajes
    spring.datasource.username=root
    spring.datasource.password=admin
   ```

4. Ejecuta el proyecto con Maven:
  ```bash
  ./mvnw spring-boot:run
  ```
## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.

## Licencia
Este proyecto está licenciado bajo los términos de la licencia MIT.

