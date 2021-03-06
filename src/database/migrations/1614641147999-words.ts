import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class words1614641147999 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'words',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
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
          name: 'pages',
          type: 'text',
          isNullable: true
        },

        {
          name: 'see_too',
          type: 'text',
          isNullable: true
        },
        {
          name: "created_at",
          type: 'timestamp',
          default: "now()"
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('words');
  }

}
