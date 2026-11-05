import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {env} from './config/env.js'

const app = express()

app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'agendia'})
})

export default app
