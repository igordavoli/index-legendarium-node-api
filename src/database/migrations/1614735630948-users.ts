import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class users1614735630948 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'user_name',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'string'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }

      ]
    })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
