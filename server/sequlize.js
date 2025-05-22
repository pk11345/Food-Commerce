import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.db_database,
  username: process.env.db_user,
  password: process.env.db_password,

  host: process.env.db_host,
  port: process.env.db_port,
  dialect: process.env.db_dialect,
  schema: process.env.db_schema,
  searchPath: process.env.db_searchPath,
  timezone: process.env.db_timezone,
  dialectOptions: {
    prependSearchPath: true,
  },
});

export default sequelize;
