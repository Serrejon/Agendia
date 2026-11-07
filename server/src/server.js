import { connectDatabase, syncDatabase } from './config/database.js';
import app from './app.js';
import { env } from './config/env.js';


import './models/index.js'

const startServer = async () => {
  try {
    await connectDatabase();
    await syncDatabase();
    app.listen(env.port, () => {
      console.log(`Servidor Agendia escuchando en http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();