import express from 'express'
import ChatRoomController from '../Controller/ChatRoomController'

const router = express.Router()

router.get('/', ChatRoomController.getAllChatRooms)
router.get('/:id', ChatRoomController.getChatRoom)
router.post('/', ChatRoomController.createChatRoom)
router.delete('/:id', ChatRoomController.deleteChatRoom)

export default router;