import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class words1614641147999 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'words',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: "created_by",
          type: 'uuid',
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
        {
          name: 'created_at',
          type: 'timestamp',
          default: "now()"
        },
      ],
      foreignKeys: [
        {
          name: 'FKCreator',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['created_by'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('words');
  }

}
