import "reflect-metadata";
import { DataSource } from "typeorm";
import { Alumno } from "./entities/Entities";

export class DatabaseConnection {
  
  private dataSource: DataSource;
  name: string | undefined;

  constructor() {
    this.dataSource = new DataSource({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "fiubito",
      database: "FIUBITO",
      synchronize: true,
      logging: false,
      entities: ["src/entities/*.ts"],
    });
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }

  // async close(): Promise<void> {
  //   return await this.dataSource.close();
  // }


}
