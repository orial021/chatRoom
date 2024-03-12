import express, { type Express } from 'express'
import path from 'path'
import { Server } from 'socket.io'
import config from './index'
import mainRouter from './routes/index'
import ErrorReportingService from './Service/ErrorReportService'
import UserService from './Service/UserService'
import http from 'http'

const users: { [key: string]: any } = {}

export class IServer {

    private app: Express
    private io: Server
    private httpServer: http.Server

    constructor() {
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.io = new Server(this.httpServer)
        this.configuration()
        this.middlewares()
        this.setupSocketIO()
        
      
    }
    configuration() {
        this.app.set('port', config.PORT)
      }
     
      middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended:true }))
        this.app.use(express.static(path.join(__dirname, 'public')))

        this.app.use((req, res, next) => {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            next()
        })

        this.app.use(async (err: any, req: any, res: any, next: any) => {
            await ErrorReportingService.reportError(err)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        })
        this.app.use('/api', mainRouter)

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        })
    }

    private setupSocketIO() {
        this.io.on('connection', (socket) => {
            console.log('Un usuario se ha conectado')

            socket.on('new user', async (userData) => {
                try {
                    const newUser = await UserService.createUser(userData)
                    socket.emit('user created')
                } catch (err) {
                    socket.emit('error', (err as any).message)
                }
            })
            socket.on('new user', (username) => {
                users[username] = socket.id
            })

            socket.on('join room', (roomName: string) => {
                socket.join(roomName)
            })

            socket.on('chat message', (msg: string) => {
                this.io.emit('chat message', msg)
            })

            socket.on('private message', (recipient, msg) => {
                const id = users[recipient]
                if (id) {
                    this.io.to(id).emit('private message', msg)
                }
            })
            socket.on('disconnect', () => {
                console.log('Un usuario se ha desconectado')
            })
        })
    }
    
     public listen() {
        this.httpServer.listen(this.app.get('port'), () => {
          console.log(`el servidor esta escuchando en ${this.app.get('port')}`)
        })
      }
}



