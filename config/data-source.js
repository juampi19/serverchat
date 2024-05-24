import { DataSource } from "typeorm";
import { MessageSchema } from "../entities/message.entity.js";
import { UserSchema } from "../entities/user.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "chat-prueba",
  synchronize: true,
  logging: true,
  entities: [MessageSchema, UserSchema],
  subscribers: [],
  migrations: [],
})