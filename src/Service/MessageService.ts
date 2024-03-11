import {getRepository} from "typeorm"
import {Message} from "../Entity/MessageEntity"
import {User} from "../Entity/UserEntity"
import {ChatRoom} from "../Entity/ChatRoomEntity"

interface IMessageService {
    getAllMessages(): any
    getMessage(id: string): Promise<Message | null>
    updateMessage(id: string, content: string): Promise<Message | null>
    createMessage(userId: string, chatRoomId: string, content: string): Promise<Message | null>
    deleteMessage(id: string): Promise<boolean>
}
class MessageService implements IMessageService{

public async getAllMessages() {
    try {
        const messageRepository = getRepository(Message);
        return await messageRepository.find();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

public async getMessage(id: string) {
    try {
        const messageRepository = getRepository(Message);
        const message = await messageRepository.findOne(id as any);
        return message;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

public async updateMessage(id: string, content: string) {
    try {
        const messageRepository = getRepository(Message);
        const message = (await messageRepository.findByIds([id]))[0]

        if (message) {
            message.content = content;
            return await messageRepository.save(message);
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

public async createMessage(userId: string, chatRoomId: string, content: string) {
    try {
        const userRepository = getRepository(User)
        const chatRoomRepository = getRepository(ChatRoom)
        const messageRepository = getRepository(Message)

        const user = await userRepository.findOne(userId as any)
        const chatRoom = await chatRoomRepository.findOne(chatRoomId as any)

        if (!user || !chatRoom) {
            throw new Error('Usuario o sala de chat no encontrados')
        }

        let message = new Message()
        message.content = content
        message.user = user
        message.chatRoom = chatRoom

        return await messageRepository.save(message)
    } catch (error) {
        console.error(error);
        throw error;
    }
}

public async deleteMessage(id: string) {
    try {
        const messageRepository = await getRepository(Message)
        const message = await messageRepository.findOne(id as any)

        if (message) {
            await messageRepository.remove(message)
        }
        return true
    } catch (error) {
        console.error(error);
        throw error;
    }
}
} 
export default new MessageService()