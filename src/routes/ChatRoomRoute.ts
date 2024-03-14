import express from 'express'
import ChatRoomController from '../Controller/ChatRoomController'

const router = express.Router()

router.get('/all', ChatRoomController.getAllChatRooms)
router.get('/show:id', ChatRoomController.getChatRoom)
router.post('/create', ChatRoomController.createChatRoom)
router.delete('/delete:id', ChatRoomController.deleteChatRoom)

export default router;