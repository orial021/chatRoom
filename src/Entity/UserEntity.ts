import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from "typeorm"
import * as bcrypt from 'bcrypt'
import { IsNotEmpty, MinLength, MaxLength, IsInt, Min, Max } from 'class-validator'
import { Message } from './MessageEntity'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    usuario: string
    
    @Column()
    @IsNotEmpty()
    @MinLength(4)
    password: string

    @Column()
    @IsNotEmpty()
    firstName: string

    @Column()
    @IsNotEmpty()
    lastName: string

    @Column()
    @IsInt()
    @Min(18)
    @Max(99)
    age: number

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Message, message => message.user)
    messages: Message[]
}