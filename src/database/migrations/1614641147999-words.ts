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
          type: 'varchar'
        },
        {
          name: 'type',
          type: 'varchar'
        },
        {
          name: 'meaning',
          type: 'text'
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'pages',
          type: 'text'
        },

        {
          name: 'see_too',
          type: 'text'
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
