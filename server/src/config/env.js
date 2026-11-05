import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'developement',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};