
import app from './server'

app.listen( app.get('port'), () => {
    console.log('Server is up!')
})