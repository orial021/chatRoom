import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm"
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
    @BeforeUpdate()
    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10)
    }

    @OneToMany(() => Message, message => message.user)
    messages: Message[]
}