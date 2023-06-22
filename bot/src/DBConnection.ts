import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alumno, AlumnoCarrera, AlumnoMateria, Materia, MateriaAprobada } from "./entities/Entities";
import { loadData } from "./LoadDB";

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
      where: { alumnoPadron: alumnoMateria.alumnoPadron , materiaCodigo: alumnoMateria.materiaCodigo}});

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

  public static async saveMateriaAprobada(materiaAprobada: MateriaAprobada) {
    try {
      const ds = await this.dataSrcPromise;
      const existingMateriaAprobada = await ds.manager.findOne(AlumnoMateria, {
      where: { alumnoPadron: materiaAprobada.alumnoPadron }});

      if(!existingMateriaAprobada){
        ds.manager.save(materiaAprobada);
        console.log("Materia aprobada guardado en la base de datos.");
      } else {
        console.log("La materia aprobada ya existe en la base de datos.");
      }
    }catch (error) {
      console.error("Se produjo un error al guardar la materia aprobada:", error);
    }
  }

  // Obtiene la carrera del alumnoMateria con el padron y
  // luego todas las materias de la tabla Materias correspondientes a esa carrera
  public static async getMateriasPorCarrera(padron: number): Promise<Materia[] | undefined> {
    try {
      const ds = await this.dataSrcPromise;
      const alumnoCarreras = await ds.manager.find(AlumnoCarrera, { where: { alumnoPadron: padron } });
      
      if (!alumnoCarreras || alumnoCarreras.length === 0) {
        return undefined; 
      }
      
      const carreraIds = alumnoCarreras.map((ac) => ac.carreraId);
      
      const materias = await ds.manager
        .createQueryBuilder(Materia, "materia")
        .where("materia.carreraId IN (:...carreraIds)", { carreraIds })
        .getMany();
        
      return materias;
    } catch (error) {
      console.error("Se produjo un error al obtener las materias:", error);
    }
  }
  

  public static async getCodigoMateriaPorNombre(nombre: string): Promise<string | null> {
    try {
      const ds = await this.dataSrcPromise;
      const materia = await ds.manager.findOne(Materia, { where: { nombre } });
  
      if (materia) {
        return materia.codigo;
      } else {
        console.log("No se encontró ninguna materia con ese nombre.");
        return null;
      }
    } catch (error) {
      console.error("Se produjo un error al obtener el código de la materia:", error);
      return null;
    }
  }
  
}
