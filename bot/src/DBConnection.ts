import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alumno } from "./entities/Entities";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource(require("../config.json").database);
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }

  saveAlumno(alumno: Alumno) {
    const existingAlumno = this.dataSource.manager.findOne(Alumno, {
      where: { padron: alumno.padron }
    });

    if (!existingAlumno) {
      this.dataSource.manager.save(alumno);
      console.log("Alumno guardado en la base de datos.");
    } else {
      console.log("El alumno ya existe en la base de datos.");
    }
  }

  async close(): Promise<void> {
    return await this.dataSource.close();
  }
}
