import cors  from 'cors'
import morgan from 'morgan'
import express from 'express'

import mongo from './app/config/database.js'
import { API } from './app/globals.js'
import logger from './app/helpers/logger.js'

import userRoutes from './app/routes/user.routes.js'

mongo()
const app = express()

app.use(express.json())
app.use(morgan('dev'))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


// routes
app.get('/', (req, res) => res.send('Gamer Stats Service Running')) // health check/server ping route

const serviceName = 'Gamer stats server'
const port =  API.PORT
app.listen(port, () => {
  logger.log(`🎮🎮 ${serviceName} listening on port ${port}! 🎮🎮`)
})

app.use("/api/user", userRoutes)