import { IServer } from './server'
import express from 'express'
import dotenv from "dotenv"
import { createConnection } from 'typeorm'

dotenv.config()

const AppConfig = {
    PORT: process.env.PORT || 3000,
}

export default Object.freeze(AppConfig)

const env = (key: any, defaultValue=null)=>{
    return process.env[key] || defaultValue;
}

export const app = express()
export const server: IServer = new IServer()

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "2354",
    database: "practicas",
    entities: [
        "src/Entity/**/*.ts"],
    synchronize: true,
})
.then(async connection => {
    server.listen()
})
.catch(error => {
    console.error('Error al conectar a la base de datos', error)
    process.exit(1)
})