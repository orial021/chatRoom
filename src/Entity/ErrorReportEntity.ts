import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class ErrorReport {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    message: string

    @Column({ type: 'text' })
    stack: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date
}