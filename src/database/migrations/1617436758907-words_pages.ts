import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class wordsPages1617436758907 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'words_pages',
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
          name: 'word_id',
          type: 'uuid'
        },
        {
          name: 'page',
          type: 'number'
        }
      ],
      foreignKeys: [
        {
          name: 'FKWord',
          referencedTableName: 'words',
          referencedColumnNames: ['id'],
          columnNames: ['word_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }
      ]
    })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
