import express from 'express';
import MessageController from '../Controller/MessageController'

const router = express.Router();

router.get('/all', MessageController.getAllMessages)
router.get('/show:id', MessageController.getMessage)
router.post('/create', MessageController.createMessage)
//router.put('/:id', MessageController.updateMessage)
router.delete('/delete:id', MessageController.deleteMessage)

export default router;