import express from 'express'
import MessageService from '../Service/MessageService'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const messages = await MessageService.getAllMessages()
        res
        .json(messages)
    } catch (error) {
        res
        .status(500)
        .json({ error: (error as any).toString() })
    }
})

router.get('/:id', async (req, res) => {
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
        res
        .status(500)
        .json({ error: (error as any).toString() })
    }
})

router.post('/', async (req, res) => {
    try {
        const { userId, chatRoomId, content } = req.body;
        const newMessage = await MessageService.createMessage(userId, chatRoomId, content)
        res
        .json(newMessage)
    } catch (error) {
        res
        .status(500)
        .json({ error: (error as any).toString() })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body
        const updatedMessage = await MessageService.updateMessage(req.params.id, content)
        if (updatedMessage) {
            res
            .json(updatedMessage)
        } else {
            res
            .status(404)
            .json({ error: 'Mensaje no encontrado' })
        }
    } catch (error) {
        res
        .status(500)
        .json({ error: (error as any).toString() })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const success = await MessageService.deleteMessage(req.params.id)
        if (success) {
            res.json({ message: 'Mensaje eliminado con éxito' })
        } else {
            res
            .status(404).json({ error: 'Mensaje no encontrado' })
        }
    } catch (error) {
        res
        .status(500)
        .json({ error: (error as any).toString() })
    }
})

export default router