import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './UserEntity'
import { ChatRoom } from './ChatRoomEntity';

@Entity()
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string

    @ManyToOne(() => User, user => user.messages)
    user: User;

    @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages)
    chatRoom: ChatRoom
}