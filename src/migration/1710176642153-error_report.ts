import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateErrorReportTable1604419960104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'error_report',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'message',
                    type: 'varchar',
                },
                {
                    name: 'stack',
                    type: 'text',
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    default: 'now()',
                }
            ],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('error_report');
    }

}