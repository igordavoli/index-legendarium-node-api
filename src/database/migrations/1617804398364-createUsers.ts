import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1617804398364 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          // {
          //   name: 'updated_at',
          //   type: 'timestamp',
          //   default: 'now()',
          //   isNullable: true
          // },
          // {
          //   name: 'is_deleted',
          //   type: 'boolean',
          // },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'user_name',
            type: 'varchar',
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'password',
            type: 'string'
          },
          // {
          //   name: 'question_0',
          //   type: 'number'
          // },
          // {
          //   name: 'question_1',
          //   type: 'number'
          // },
          // {
          //   name: 'question_2',
          //   type: 'number'
          // },
          // {
          //   name: 'answer_0',
          //   type: 'varchar'
          // },
          // {
          //   name: 'answer_1',
          //   type: 'varchar'
          // },
          // {
          //   name: 'answer_2',
          //   type: 'varchar'
          // },

        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}