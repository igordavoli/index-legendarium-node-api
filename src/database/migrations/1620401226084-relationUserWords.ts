import {MigrationInterface, QueryRunner} from "typeorm";

export class relationUserWords1620401226084 implements MigrationInterface {
    name = 'relationUserWords1620401226084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."user_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d"`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "language" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "words"."language" IS NULL`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "words"."type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "meaning"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "meaning" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "about"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "about" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "see_too"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "see_too" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_c3392415e1e70864b22058bd55d" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_c3392415e1e70864b22058bd55d"`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "see_too"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "see_too" text`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "about"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "about" text`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "meaning"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "meaning" text`);
        await queryRunner.query(`COMMENT ON COLUMN "words"."type" IS NULL`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "words"."language" IS NULL`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "language" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d"`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."user_name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
