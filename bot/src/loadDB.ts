import { DataSource, createConnection } from 'typeorm';
import csvParser from 'csv-parser';
import * as fs from 'fs';

import { Materia } from './entities/Entities';

export async function loadData(connection: DataSource) {  
  // Ruta y nombre del archivo CSV a cargar
  const csvFilePath = './src/data/informatica.csv';

  const stream = fs.createReadStream(csvFilePath)
    .pipe(csvParser({ separator: ';' })); 
  // Carga de datos
  for await (const row of stream) {
    const materia = new Materia();
    materia.codigo = row.codigo;
    materia.nombre = row.nombre;
    materia.creditos = row.creditos;
    materia.carrera = row.carreraid;

    await connection.manager.save(materia);
    console.log(`Materia ${materia.nombre} cargada`);
  }

  console.log('Proceso de carga finalizado');
}
