import { ConnectionOptions } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "db-username",
  password: process.env.DB_PASSWORD || "user-password",
  database: process.env.DB_DATABASE || "db-name",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"]
};

export default config;

