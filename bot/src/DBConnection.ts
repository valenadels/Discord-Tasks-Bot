import "reflect-metadata";
import { DataSource } from "typeorm";

export class DatabaseConnection {
  private dataSource: DataSource;

  constructor() {
    let config = require("../config.json").database;
    this.dataSource = new DataSource(config);
  }

  connect(): Promise<DataSource> {
    return this.dataSource.initialize();
  }
}
