import { Sequelize } from 'sequelize';
import { env } from './env.js';

if (!env.databaseUrl) {
  throw new Error('Falta DATABASE_URL en el archivo .env');
}

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

export const connectDatabase = async () => {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos establecida');
};

export const syncDatabase = async () => {
  await sequelize.sync();
  console.log('Modelos sincronizados con la base de datos');
};