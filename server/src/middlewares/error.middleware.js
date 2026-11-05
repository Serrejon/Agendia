import AppError from '../utils/AppError.js'
import { env } from '../config/env.js'

export const notFound = (req, res, next) => {
    next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404))
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    const message = err.isOperational ? err.message : 'Error interno del servidor'

    if(!err.isOperational) {
        console.error('ERROR NO CONTROLADO:', err)
    }

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(err.details && { details: err.details}),
        ...(env.nodeEnv === 'developement' && { stack: err.stack})
    })
}