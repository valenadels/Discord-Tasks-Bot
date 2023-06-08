import { createConnection } from 'typeorm';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

import { Materia } from './entities/EntidadesTobi';

async function loadData() {
  const connection = await createConnection();
  
  // Ruta y nombre del archivo CSV a cargar
  const csvFilePath = 'ruta_del_archivo.csv';

  const stream = fs.createReadStream(csvFilePath)
    .pipe(csvParser({ separator: '\t' })); // Si el separador es distinto de tabulación, ajusta el valor

  for await (const row of stream) {
    const materia = new Materia();
    materia.codigo = row['Código'];
    materia.nombre = row['Nombre'];
    materia.creditos = parseInt(row['Créditos']);

    await connection.manager.save(materia);
    console.log('Materia insertada exitosamente');
  }

  await connection.close();
  console.log('Proceso de carga finalizado');
}

loadData().catch(error => console.error('Error:', error));