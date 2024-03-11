import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ChatRoom1710010324495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'chat_room',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
            ],
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('chat_room')

    }

}
