import app from './app.js'
import { env } from './config/env.js'

app.listen(env.port, () => {
    console.log(`Servidor Agendia escuchando en http://localhost:${env.port}`);
})



