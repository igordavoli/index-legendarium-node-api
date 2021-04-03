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
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'is_deleted',
          type: 'number'
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
          name: 'question_0',
          type: 'number'
        },
        {
          name: 'question_1',
          type: 'number'
        },
        {
          name: 'question_2',
          type: 'number'
        },
        {
          name: 'answer_0',
          type: 'varchar'
        },
        {
          name: 'answer_1',
          type: 'varchar'
        },
        {
          name: 'answer_2',
          type: 'varchar'
        },

      ]
    })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
