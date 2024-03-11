import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Message1710007141376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'message',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user',
                    onDelete: 'CASCADE',
                },
            ],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message')
    }

}
