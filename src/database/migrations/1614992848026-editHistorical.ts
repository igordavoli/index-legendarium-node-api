import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class editHistorical1614992848026 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'edit_historical',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'userName',
          type: 'varchar'
        },
        {
          name: 'word_id',
          type: 'number'
        },
        {
          name: 'vocable',
          type: 'varchar',
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
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ],
      foreignKeys: [
        {
          name: 'FKUser',
          referencedTableName: 'users',
          referencedColumnNames: ['user_name'],
          columnNames: ['userName']
        },
        {
          name: 'FKWords',
          referencedTableName: 'words',
          referencedColumnNames: ['id'],
          columnNames: ['word_id'],
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('edit_historical');
  }

}
