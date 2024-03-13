import {getRepository} from "typeorm"
import {User} from "../Entity/UserEntity"

interface IUserService {
    getAllUsers(): Promise<User[]>
    getUser(id: string): Promise<User | null>
    updateUser(id: string, user: Partial<User>): Promise<User | null>
    createUser(user: Partial<User>): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
}

class UserService implements IUserService{

public async getAllUsers() {
    const userRepository = getRepository(User)
    return await userRepository.find()
}

public async getUser(id: string) {
    const userRepository = getRepository(User)
    const user = await userRepository.findOneBy({id})
    return user;
}

public async updateUser(id: string, userData: Partial<User>) {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(id as any)

    if (user) {
        Object.assign(user, userData)
        return await userRepository.save(user)
    }

    return null
}

public async createUser(userData: Partial<User>) {
    const userRepository = getRepository(User)

    let user = new User()
    user.usuario = req.body.usuario
    user.password = req.body.password
    

    return await userRepository.save(user)
}

public async deleteUser(id: string) {
    try {
    const userRepository = await getRepository(User)
    const user = await userRepository.findOne(id as any)

    if (user) {
        await userRepository.remove(user)
    }
    return true
} catch (error) {
    throw error
}
}
} 
export default new UserService()