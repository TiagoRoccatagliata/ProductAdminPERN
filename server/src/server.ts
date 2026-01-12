import express from 'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'


// Conectar a abse de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log(colors.red.bold('Error en DB'))
    }
}

connectDB()


// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === 'http://localhost:5173') {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())


server.use("/api/products", router)

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})

export default server