import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createWords1617811608244 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'words',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: "now()"
          },
          {
            name: 'is_deleted',
            type: 'boolean',
          },
          {
            name: 'vocable',
            type: 'varchar'
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'meaning',
            type: 'text',
            isNullable: true
          },
          {
            name: 'about',
            type: 'text',
            isNullable: true
          },
          {
            name: 'see_too',
            type: 'text',
            isNullable: true
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('words');
  }

}
