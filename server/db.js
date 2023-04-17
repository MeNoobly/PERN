import { Sequelize } from "sequelize";

export default new Sequelize("pern", "postgres", "postgres", {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.PORT,
});
