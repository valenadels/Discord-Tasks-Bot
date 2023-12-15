# BOT DE TAREAS
Para añadir a un servidor, ir a este link: https://discord.com/api/oauth2/authorize?client_id=1185291664575709215&permissions=274878040064&scope=bot

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


