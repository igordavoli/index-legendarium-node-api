import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPages1617841721426 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'pages',
      columns: [
        {
          name: 'page',
          type: 'integer',
          isUnique: true,
          isPrimary: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'created_by',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
