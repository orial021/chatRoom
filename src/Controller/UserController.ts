import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from "../Entity/UserEntity"
import * as bcrypt from 'bcrypt'
import ErrorReportingService from "../Service/ErrorReportService"

export async function createUser(req: Request, res: Response) {
  try{
    const userRepository = getRepository(User)

    let user = new User()
    user.usuario = req.body.usuario
    user.password = await bcrypt.hash(req.body.password, 10)
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
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (passwordMatch) {
            res
            .send("Inicio de sesión exitoso")
        } else {
            res
            .status(401)
            .send("Contraseña incorrecta")
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