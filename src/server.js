import './loadEnv'
import db from './database'
import express from 'express'

/* importing middlewares */
import sessionMiddlewares from './middlewares/session'

/* importing routes */
import authRoutes from './routes/auth'
import movieRoutes from './routes/movie'
// db.sync({force: true})
const app = express()
app.use(express.json())

/* middlewares */
app.use(sessionMiddlewares.deserializeSession)



app.use('/auth', authRoutes)
app.use('/movies', movieRoutes)

app.set('port', process.env.PORT ?? 3000)



export default app