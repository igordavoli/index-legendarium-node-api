import { ConnectionOptions } from "typeorm";

const options: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  synchronize: false,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/models/*.ts"],
  cli: { migrationsDir: "./src/database/migrations" }
}

export default options;