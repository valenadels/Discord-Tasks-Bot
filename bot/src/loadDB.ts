import { DataSource, createConnection } from 'typeorm';
import csvParser from 'csv-parser';
import * as fs from 'fs';

import { Materia } from './entities/EntidadesTobi';

export async function loadData(connection: Promise<DataSource> ) {  
  // Ruta y nombre del archivo CSV a cargar
  const csvFilePath = '/home/valentinaadelsflugel/fiuba/FIUBITO_TDL/informatica.csv';

  const stream = fs.createReadStream(csvFilePath)
    .pipe(csvParser({ separator: ';' })); // Si el separador es distinto de tabulación, ajusta el valor

  // Carga de datos
  for await (const row of stream) {
    const materia = new Materia();
    materia.codigo = row.codigo;
    materia.nombre = row.nombre;
    materia.creditos = row.creditos;
    materia.carrera = row.carrera;

    await (await connection).manager.save(materia);
    console.log(`Materia ${materia.nombre} cargada`);
  }

  console.log('Proceso de carga finalizado');
}
