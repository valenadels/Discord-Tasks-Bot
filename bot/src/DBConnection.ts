import { createConnection, Connection, getRepository } from 'typeorm';

let connection: Connection | undefined;

export async function connect() {
  connection = await createConnection();
}


async function closeConnection() {
  if (connection) {
    await connection.close();
  }
}

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
