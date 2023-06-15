import { DataSource, createConnection } from 'typeorm';
import csvParser from 'csv-parser';
import * as fs from 'fs';

import { Carreras, Materia } from './entities/Entities';
export async function loadData(connection: DataSource) {  
  // Ruta y nombre del archivo CSV a cargar
  const carrerasCsvFilePath = './src/data/CARRERAS.csv';
  const materiasInformaticaCsvFilePath = './src/data/INFORMATICA.csv';

  const streamMaterias = fs.createReadStream(materiasInformaticaCsvFilePath).pipe(csvParser({ separator: ';' })); 
  const streamCarreas = fs.createReadStream(carrerasCsvFilePath).pipe(csvParser({ separator: ';' }));
 
  for await (const row of streamCarreas) {
    const carrera = new Carreras();
    carrera.nombre = row.nombre;
    carrera.duracion = row.duracion;

    await connection.manager.save(carrera);
    console.log(`Carrera ${carrera.nombre} cargada`);
  }

  for await (const row of streamMaterias) {
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
