import { Request, Response } from 'express'
import ChatRoomService from '../Service/ChatRoomService'
import ErrorReportingService from '../Service/ErrorReportService'

export default class ChatRoomController {
    static getAllChatRooms = async (req: Request, res: Response) => {
        try {
            const chatRooms = await ChatRoomService.getAllChatRooms()
            res
            .json(chatRooms)
        } catch (error) {
            await ErrorReportingService
            .reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static getChatRoom = async (req: Request, res: Response) => {
        try {
            const chatRoom = await ChatRoomService.getChatRoom(req.params.id)
            if (chatRoom) {
                res
                .json(chatRoom)
            } else {
                res
                .status(404)
                .json({ error: 'Sala de chat no encontrada' })
            }
        } catch (error) {
            await ErrorReportingService
            .reportError(error)
             res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static createChatRoom = async (req: Request, res: Response) => {
        try {
            const newChatRoom = await ChatRoomService.createChatRoom()
            res
            .json(newChatRoom)
        } catch (error) {
            await ErrorReportingService
            .reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }

    static deleteChatRoom = async (req: Request, res: Response) => {
        try {
            const success = await ChatRoomService.deleteChatRoom(req.params.id)
            if (success) {
                res
                .json({ message: 'Sala de chat eliminada con éxito' })
            } else {
                res
                .status(404)
                .json({ error: 'Sala de chat no encontrada' })
            }
        } catch (error) {
            await ErrorReportingService
            .reportError(error)
            res
            .status(500)
            .json({ error: 'Ha ocurrido un error' })
        }
    }
}