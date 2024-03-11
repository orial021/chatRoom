import { getRepository } from 'typeorm'
import { ChatRoom } from '../Entity/ChatRoomEntity'

class ChatRoomService {
    static getAllChatRooms = async (): Promise<ChatRoom[]> => {
        const chatRoomRepository = getRepository(ChatRoom)
        const chatRooms = await chatRoomRepository.find()
        return chatRooms
    }

    static getChatRoom = async (id: string): Promise<ChatRoom | null> => {
        const chatRoomRepository = getRepository(ChatRoom)
        const chatRoom = await chatRoomRepository.findOne({ where: { id } })
        return chatRoom || null
    }

    static createChatRoom = async (): Promise<ChatRoom> => {
        const chatRoomRepository = getRepository(ChatRoom)
        const newChatRoom = new ChatRoom()
        await chatRoomRepository.save(newChatRoom)
        return newChatRoom
    }

    static deleteChatRoom = async (id: string): Promise<boolean> => {
        const chatRoomRepository = getRepository(ChatRoom)
        const deleteResponse = await chatRoomRepository.delete(id)
        return deleteResponse.affected !== 0
    }
}

export default ChatRoomService