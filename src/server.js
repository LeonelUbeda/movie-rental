import './loadEnv'
import db from './database'
import express from 'express'

/* importing middlewares */
import sessionMiddlewares from './middlewares/sessionMiddleware'

/* importing routes */
import authRoutes from './routes/authRoute'
import movieRoutes from './routes/movieRoute'
import movieItemRoutes from './routes/movieItemRoute'


const app = express()
app.use(express.json())

/* middlewares */
app.use(sessionMiddlewares.deserializeSession)



app.use('/auth', authRoutes)
app.use('/movies', movieRoutes)
app.use('/movies', movieItemRoutes)

app.set('port', process.env.PORT ?? 3000)



export default app