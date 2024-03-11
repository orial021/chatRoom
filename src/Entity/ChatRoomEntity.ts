import {Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Message } from "./MessageEntity"

@Entity()
export class ChatRoom {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany(() => Message, message => message.chatRoom)
    messages: Message[]
}