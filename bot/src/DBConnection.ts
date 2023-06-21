import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alumno, AlumnoCarrera, AlumnoMateria } from "./entities/Entities";
import { loadData } from "./loadDB";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private dataSource: DataSource;
  private static dataSrcPromise: Promise<DataSource>;
  private isConnected: boolean;

  private constructor() {
    this.dataSource = new DataSource(require("../config.json").database);
    this.isConnected = false;
    DatabaseConnection.dataSrcPromise = this.connect();
  }

  public static initializeDB(){
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
  }

  private connect(): Promise<DataSource> {
    if (!this.isConnected) {
      this.isConnected = true;
      return this.dataSource.initialize();
    }
    return Promise.resolve(this.dataSource);
  }

  public static loadDBData() {
    let newPromise: Promise<DataSource> | undefined;
    this.dataSrcPromise
      .then((ds) => {
        loadData(ds);
        newPromise = Promise.resolve(ds); 
      })
      .finally(() => {
        this.dataSrcPromise = newPromise!; 
      });
  }
  
  
  public static async saveAlumno(alumno: Alumno) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumno = await ds.manager.findOne(Alumno, {
        where: { padron: alumno.padron }});
  
      if (!existingAlumno) {
        ds.manager.save(alumno);
        console.log("Alumno guardado en la base de datos.");
      } else {
        console.log("El alumno ya existe en la base de datos.");
      }
    } catch (error) {
      console.error("Se produjo un error al guardar el alumno:", error);
    }
  }  

  public static async saveAlumnoCarrera(alumnoCarrera: AlumnoCarrera) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumnoCarrera = await ds.manager.findOne(AlumnoCarrera, {
      where: { alumnoPadron: alumnoCarrera.alumnoPadron }});

      if(!existingAlumnoCarrera){
        ds.manager.save(alumnoCarrera);
        console.log("AlumnoCarrera guardado en la base de datos.");
      } else {
        console.log("El alumno ya existe en la base de datos.");
      }
    }catch (error) {
      console.error("Se produjo un error al guardar el alumnoCarrera:", error);
    }
  }
  

  public static async saveAlumnoMateria(alumnoMateria: AlumnoMateria) {
    try {
      const ds = await this.dataSrcPromise;
      const existingAlumnoMateria = await ds.manager.findOne(AlumnoMateria, {
      where: { alumnoPadron: alumnoMateria.alumnoPadron }});

      if(!existingAlumnoMateria){
        ds.manager.save(alumnoMateria);
        console.log("AlumnoMateria guardado en la base de datos.");
      } else {
        console.log("El alumno ya existe en la base de datos.");
      }
    }catch (error) {
      console.error("Se produjo un error al guardar el alumnoCarrera:", error);
    }
  }
}
