import express from "express"
import { createUser, loginUser } from "../Controller/UserController"
import path from 'path'

const router = express.Router()

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'))
})
router.post('/register', createUser)
router.post('/login', loginUser)

export default router