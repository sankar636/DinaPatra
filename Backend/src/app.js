import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// cors configration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//middleware configration(this allow json object in the request.body)
app.use(express.json({
    limit:'16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit:'16kb'
}))

app.use(express.static('public'))

app.use(cookieParser())

import authRoutes from './routes/auth.route.js'
app.use('/api/v1/auth',authRoutes)


export { app }