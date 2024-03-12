import { Request, Response } from 'express'
import MessageService from '../Service/MessageService'
import ErrorReportingService from '../Service/ErrorReportService'

export default class MessageController {
    static getAllMessages = async (req: Request, res: Response) => {
        try {
            const messages = await MessageService.getAllMessages()
            res.json(messages)
        } catch (error) {
            await ErrorReportingService.reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static getMessage = async (req: Request, res: Response) => {
        try {
            const message = await MessageService.getMessage(req.params.id)
            if (message) {
                res
                .json(message)
            } else {
                res
                .status(404)
                .json({ error: 'Mensaje no encontrado' })
            }
        } catch (error) {
            await ErrorReportingService.reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static createMessage = async (req: Request, res: Response) => {
        try {
            const { userId, chatRoomId, content } = req.body
            const newMessage = await MessageService.createMessage(userId, chatRoomId, content)
            res
            .json(newMessage)
        } catch (error) {
            await ErrorReportingService
            .reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static deleteMessage = async (req: Request, res: Response) => {
        try {
            const success = await MessageService.deleteMessage(req.params.id)
            if (success) {
                res
                .json({ message: 'Mensaje eliminado con éxito' })
            } else {
                res
                .status(404)
                .json({ error: 'Mensaje no encontrado' })
            }
        } catch (error) {
            await ErrorReportingService.reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }
}
