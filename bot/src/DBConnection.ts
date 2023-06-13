import "reflect-metadata";
import { DataSource } from "typeorm";
import { loadData } from "./loadDB";

export class DatabaseConnection {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "mysql",
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
    let connection = this.dataSource.initialize();
    loadData(connection).catch(error => console.error('Error:', error));
    return connection;
  }
}
