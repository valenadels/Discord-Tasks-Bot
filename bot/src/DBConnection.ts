import { DataSource, In } from "typeorm";
import { Task} from "./entities/Entities";

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

  public static initializeDB() {
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

  public static async saveTask(task: Task): Promise<Task | undefined> {
    try {
      const ds = await this.dataSrcPromise;
      return ds.manager.save(task);
  
    } catch (error) {
      console.error("An error occurred while saving the task:", error);
    }
  }

  // public static async finishTask(materia: AlumnoMateria): Promise<string> {
  //   try {
  //     const ds = await this.dataSrcPromise;
  //     const existingMateria = await ds.manager.findOne(AlumnoMateria, {
  //       where: { alumnoPadron: materia.alumnoPadron, materiaCodigo: materia.materiaCodigo }
  //     });

  //     if (existingMateria) {
  //       await ds.manager.remove(AlumnoMateria, existingMateria);
  //       return "Se ha dado de baja de la materia ingresada.";
  //     } else {
  //       return "La materia no fue cargada, por lo que no puede darse de baja.";
  //     }
  //   } catch (error) {
  //     console.error("Se produjo un error al eliminar la materia:", error);
  //     return "Se produjo un error al eliminar la materia.";
  //   }
  // }
  
  // public static async getAllTasks(): Promise<string[]> {
  //   try {
  //     const ds = await this.dataSrcPromise;
  //     const materias = await ds.manager.find(Materia);
  //     const opcionesMateria: string[] = materias.map((opcion) => opcion.nombre);
  //     return opcionesMateria;
  //   } catch (error) {
  //     console.error("Se produjo un error al obtener todas las materias:", error);
  //     return [];
  //   }
  // }
  
}



