# FIUBITO_TDL
Desarollo de un bot de discord que brinda ayuda academica en la carrera de Ing. Informática, Electrónica y Sistemas de Fiuba.

Te permite llevar un registro de tus materias aprobadas, registrar materias para cursar y detectar las correlativas necesarias. Si estás cursando más de una carrera, también podés registrarla y llevar control de ella.
Además provee links a herramientas útiles para tu cursada.

# EJECUCIÓN
Antes de correrlo, se debe tener creada una base de datos en localhost y agregar esa configuracion al archivo config.json. Ejemplo:
```
{
    "token": "eltokenprivadodelbot",
    "database": {
      "type": "mariadb",
      "host": "localhost",
      "port": 3306,
      "username": "<myusername>",
      "password": "<mypassword>",
      "database": "FIUBITO",
      "synchronize": true,
      "logging": false,
      "entities": ["src/entities/*.ts"]
    }
}
```

Para levantar el bot ejecutar `npm run start` desde el directorio /bot. 

# USO
Para utilizar algún comando se debe tipear `/` y aparecerán las opciones disponibles.


