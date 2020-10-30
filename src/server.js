import './loadEnv'
import './database'
import express from 'express'

/* importing middlewares */
import sessionMiddlewares from './middlewares/session'

/* importing routes */
import authRoutes from './routes/auth'

const app = express()
app.use(express.json())

/* middlewares */
app.use(sessionMiddlewares.deserializeSession)



app.use('/auth', authRoutes)

app.set('port', process.env.PORT ?? 3000)



export default app