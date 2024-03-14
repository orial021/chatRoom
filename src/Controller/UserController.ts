import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../Entity/UserEntity"
import bcrypt from 'bcrypt'
import ErrorReportingService from "../Service/ErrorReportService"
import * as jwt from 'jsonwebtoken'

export async function createUser(req: Request, res: Response) {
  try{
    const userRepository = getRepository(User)

    let user = new User()
    user.usuario = req.body.usuario
    user.password = req.body.password
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.age = req.body.age

    const result = await userRepository.save(user)

    res
    .send(result)
} catch (error) {
    await ErrorReportingService.reportError(error);
    res
    .status(500)
    .json({ error: 'Ocurrio un error al crear el usuario' })
}
}

export async function loginUser(req: Request, res: Response) {
    try {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: {usuario: req.body.usuario} })

    if (user) {
        console.log('Contrasena almacenada(hash):', user.password)

        const passwordMatch = req.body.password

        console.log('Contrasena ingresada(hash):', req.body.password)


        if (passwordMatch) {
            const authToken = jwt.sign({ id: user.id }, 'tokenAuth', {expiresIn: '1h' })
            res
            .status(200)
            .json({ message: 'Inicio de sesión exitoso', authToken: "tu_token_de_verificacion" })
        } else {
            res
            .status(401)
            .json({ error: "Contraseña incorrecta" })
        }
    } else {
        res
        .status(404)
        .send("Usuario no encontrado")
    }
    } catch (error) {
        await ErrorReportingService.reportError(error);
    res
    .status(500)
    .json({ error: 'Ocurrio un error al iniciar sesion' })
    }
}