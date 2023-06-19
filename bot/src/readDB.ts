import { createConnection, getRepository } from 'typeorm';
import { Materia } from './entities/Entities';

async function buscarMateriaPorNombre(nombre: string) {
  const connection = await createConnection(); // Establecer conexión con la base de datos, no se si esto funciona bien o no
  const materiaRepository = connection.getRepository(Materia);

  const materiaEncontrada = await materiaRepository.findOne({ nombre });

  await connection.close(); // Cerrar conexión con la base de datos, no se si esto funciona bien o no

  return materiaEncontrada;
}


buscarMateriaPorNombre('buscar algo aca').then(materia => {
  if (materia) {
    console.log(`La materia ${materia.nombre}, código ${materia.codigo}, otorga ${materia.creditos} créditos y sus correlativas son:`);
    const correlativas = materia.correlativas.split(',');
    correlativas.forEach(correlativa => console.log(`- ${correlativa.trim()}`));
  } else {
    console.log('No se encontró ninguna materia con ese nombre.');
  }
}).catch(error => console.error(error));