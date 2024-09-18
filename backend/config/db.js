import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
    database: process.env.DB_NAME, 
    ssl: false,
    clientMinMessages: 'notice',
});

export const sq = sequelize;