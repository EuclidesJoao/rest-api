import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import configuration from "../config";
dotenv.config();

const {
  database: { host, port, username, password, database },
} = configuration;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  logging: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}']
});

