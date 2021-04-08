import {MigrationInterface, QueryRunner} from "typeorm";

export class relationCreatedBy1617817076257 implements MigrationInterface {
    name = 'relationCreatedBy1617817076257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_words" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar NOT NULL, "type" varchar NOT NULL, "meaning" varchar NOT NULL, "about" varchar NOT NULL, "see_too" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_words"("id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too") SELECT "id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too" FROM "words"`);
        await queryRunner.query(`DROP TABLE "words"`);
        await queryRunner.query(`ALTER TABLE "temporary_words" RENAME TO "words"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "email" varchar NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "created_at", "email", "user_name", "password") SELECT "id", "created_at", "email", "user_name", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_words" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar NOT NULL, "type" varchar NOT NULL, "meaning" varchar NOT NULL, "about" varchar NOT NULL, "see_too" varchar NOT NULL, CONSTRAINT "FK_c3392415e1e70864b22058bd55d" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_words"("id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too") SELECT "id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too" FROM "words"`);
        await queryRunner.query(`DROP TABLE "words"`);
        await queryRunner.query(`ALTER TABLE "temporary_words" RENAME TO "words"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" RENAME TO "temporary_words"`);
        await queryRunner.query(`CREATE TABLE "words" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar NOT NULL, "type" varchar NOT NULL, "meaning" varchar NOT NULL, "about" varchar NOT NULL, "see_too" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "words"("id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too") SELECT "id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too" FROM "temporary_words"`);
        await queryRunner.query(`DROP TABLE "temporary_words"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "email" varchar NOT NULL, "user_name" varchar NOT NULL, "password" string NOT NULL, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), PRIMARY KEY ("id", "user_name"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "created_at", "email", "user_name", "password") SELECT "id", "created_at", "email", "user_name", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "words" RENAME TO "temporary_words"`);
        await queryRunner.query(`CREATE TABLE "words" ("id" uuid PRIMARY KEY NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar, "type" varchar, "meaning" text, "about" text, "see_too" text)`);
        await queryRunner.query(`INSERT INTO "words"("id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too") SELECT "id", "created_at", "created_by", "vocable", "language", "type", "meaning", "about", "see_too" FROM "temporary_words"`);
        await queryRunner.query(`DROP TABLE "temporary_words"`);
    }

}
