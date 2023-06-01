import "reflect-metadata"
import { DataSource } from "typeorm"


const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "fiubito",
    database: "fiubito_base_de_datos",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
  }
  )

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

// async function doSomething() {
//   if (!connection) {
//     console.error('La conexión no ha sido establecida. Debes llamar a la función "connect" primero.');
//     return;
//   }

//   const alumnosRepository = getRepository(Alumno);
//   const carrerasRepository = getRepository(Carrera);
//   const materiasRepository = getRepository(Materia);

//   // Realiza las operaciones que desees utilizando los repositorios

//   // Ejemplo: obtener todos los alumnos
//   const alumnos = await alumnosRepository.find();
//   console.log(alumnos);
// }
