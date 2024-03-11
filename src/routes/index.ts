import express from 'express'
import Message from './MessageRoute'
import User from './UserRoutes'
import ChatRoom from './ChatRoomRoute'

const router = express.Router()

router.use('/messages', Message)
router.use('/user', User)
router.use('/chatRoom', ChatRoom)

export default router