import "reflect-metadata";
import { DataSource } from "typeorm";

export class DatabaseConnection {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "fiubito",
      database: "fiubito_base_de_datos",
      synchronize: true,
      logging: false,
      entities: ["src/entities/*.ts"],
    });
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }
}
