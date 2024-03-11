import express, { type Express } from 'express'
import path from 'path'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import config from './index'
import mainRouter from './routes/index'

export class IServer {

    private app: Express
    constructor() {
        this.app = express()
        this.configuration()
        this.middlewares()
    }
    configuration() {
        this.app.set('port', config.PORT)
      }
     
      middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended:true }))
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use('/api', mainRouter)

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        })
        this.app.get('/user/register', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'login.html'))
        })
        
    }
      listen() {
        this.app.listen(this.app.get('port'), () => {
          console.log(`el servidor esta escuchando en ${this.app.get('port')}`)
        })
      }
}

export let Io: Server = new Server()
const users: { [key: string]: any } = {};

Io.on('connection', (socket) => {
    console.log('un usuario se ha conectado')

    socket.on('new user', (username) => {
        users[username] = socket.id
    })
    socket.on('private message', (recipient, msg) => {
        const id = users[recipient]
        if (id) {
            Io.to(id).emit('private message', msg)
        }
    })
    socket.on('disconnect', () => {
        console.log('un usuario se ha desconectado')
    })
})
