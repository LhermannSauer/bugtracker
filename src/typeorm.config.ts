import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  synchronize: false,
  entities: ["src/entities/*"],
  migrations: ["./migrations/*"],
});
