import express from 'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'


// Conectar a abse de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold('Conexion Exitosa DB'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Error en DB'))
    }
}

connectDB()


// Instancia de express
const server = express()

// Leer datos de formularios
server.use(express.json())


server.use("/api/products", router)

export default server