import express from 'express';
import MessageController from '../Controller/MessageController

const router = express.Router();

router.get('/', MessageController.getAllMessages)
router.get('/:id', MessageController.getMessage)
router.post('/', MessageController.createMessage)
router.put('/:id', MessageController.updateMessage)
router.delete('/:id', MessageController.deleteMessage)

export default router;