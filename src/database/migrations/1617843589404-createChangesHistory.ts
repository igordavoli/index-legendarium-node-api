import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createChangesHistory1617843589404 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'changes_history',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'word_id',
          type: 'uuid'
        },
        {
          name: 'created_by',
          type: 'uuid'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
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
          name: 'see_too',
          type: 'text',
          isNullable: true
        },
      ],

      foreignKeys: [
        {
          name: 'FKUser',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['created_by'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        {
          name: 'FKWords',
          referencedTableName: 'words',
          referencedColumnNames: ['id'],
          columnNames: ['word_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('changes-history');
  }

}
