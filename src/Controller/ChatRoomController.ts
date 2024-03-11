import { Request, Response } from 'express'
import ChatRoomService from '../Service/ChatRoomService'

export default class ChatRoomController {
    static getAllChatRooms = async (req: Request, res: Response) => {
        try {
            const chatRooms = await ChatRoomService.getAllChatRooms()
            res
            .json(chatRooms)
        } catch (error) {
            res
            .status(500)
            .json({ error: (error as any).toString() })
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
            res
            .status(500)
            .json({ error: (error as any).toString() })
        }
    }

    static createChatRoom = async (req: Request, res: Response) => {
        try {
            const newChatRoom = await ChatRoomService.createChatRoom()
            res
            .json(newChatRoom)
        } catch (error) {
            res
            .status(500)
            .json({ error: (error as any).toString() })
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
            res
            .status(500)
            .json({ error: (error as any).toString() })
        }
    }
}