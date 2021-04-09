import { MigrationInterface, QueryRunner } from "typeorm";

export class relationChangesUser1617846792670 implements MigrationInterface {
  name = 'relationChangesUser1617846792670'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "temporary_pages" ("page" integer PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL, "created_by" varchar, CONSTRAINT "UQ_d60215c3b81238826895da4bf11" UNIQUE ("page"), CONSTRAINT "FK_064ab67bb29a28d073db287fc6d" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "temporary_pages"("page", "created_at", "created_by") SELECT "page", "created_at", "created_by" FROM "pages"`);
    await queryRunner.query(`DROP TABLE "pages"`);
    await queryRunner.query(`ALTER TABLE "temporary_pages" RENAME TO "pages"`);
    await queryRunner.query(`DROP INDEX "IDX_761033390be011703f0e981319"`);
    await queryRunner.query(`DROP INDEX "IDX_410b97389f40639f46df44a95c"`);
    await queryRunner.query(`CREATE TABLE "temporary_words_pages_pages" ("wordsId" varchar NOT NULL, "pagesPage" integer NOT NULL, PRIMARY KEY ("wordsId", "pagesPage"))`);
    await queryRunner.query(`INSERT INTO "temporary_words_pages_pages"("wordsId", "pagesPage") SELECT "wordsId", "pagesPage" FROM "words_pages_pages"`);
    await queryRunner.query(`DROP TABLE "words_pages_pages"`);
    await queryRunner.query(`ALTER TABLE "temporary_words_pages_pages" RENAME TO "words_pages_pages"`);
    await queryRunner.query(`CREATE INDEX "IDX_761033390be011703f0e981319" ON "words_pages_pages" ("pagesPage") `);
    await queryRunner.query(`CREATE INDEX "IDX_410b97389f40639f46df44a95c" ON "words_pages_pages" ("wordsId") `);
    await queryRunner.query(`CREATE TABLE "temporary_pages" ("page" integer PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL, "created_by" varchar, CONSTRAINT "UQ_d60215c3b81238826895da4bf11" UNIQUE ("page"), CONSTRAINT "FK_064ab67bb29a28d073db287fc6d" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "temporary_pages"("page", "created_at", "created_by") SELECT "page", "created_at", "created_by" FROM "pages"`);
    await queryRunner.query(`DROP TABLE "pages"`);
    await queryRunner.query(`ALTER TABLE "temporary_pages" RENAME TO "pages"`);
    await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "email" varchar NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
    await queryRunner.query(`INSERT INTO "temporary_users"("id", "created_at", "email", "user_name", "password") SELECT "id", "created_at", "email", "user_name", "password" FROM "users"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    await queryRunner.query(`CREATE TABLE "temporary_changes_history" ("id" varchar PRIMARY KEY NOT NULL, "word_id" varchar NOT NULL, "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar NOT NULL, "type" varchar NOT NULL, "meaning" varchar NOT NULL, "about" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "seeToo" varchar NOT NULL, CONSTRAINT "FK_eb2105759f0408e3bd530458a86" FOREIGN KEY ("word_id") REFERENCES "words" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3330cb36958e5c747a71d6495fb" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "temporary_changes_history"("id", "word_id", "created_by", "vocable", "language", "type", "meaning", "about", "createdAt", "seeToo") SELECT "id", "word_id", "created_by", "vocable", "language", "type", "meaning", "about", "createdAt", "seeToo" FROM "changes_history"`);
    await queryRunner.query(`DROP TABLE "changes_history"`);
    await queryRunner.query(`ALTER TABLE "temporary_changes_history" RENAME TO "changes_history"`);
    await queryRunner.query(`DROP INDEX "IDX_761033390be011703f0e981319"`);
    await queryRunner.query(`DROP INDEX "IDX_410b97389f40639f46df44a95c"`);
    await queryRunner.query(`CREATE TABLE "temporary_words_pages_pages" ("wordsId" varchar NOT NULL, "pagesPage" integer NOT NULL, CONSTRAINT "FK_410b97389f40639f46df44a95c1" FOREIGN KEY ("wordsId") REFERENCES "words" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_761033390be011703f0e9813199" FOREIGN KEY ("pagesPage") REFERENCES "pages" ("page") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("wordsId", "pagesPage"))`);
    await queryRunner.query(`INSERT INTO "temporary_words_pages_pages"("wordsId", "pagesPage") SELECT "wordsId", "pagesPage" FROM "words_pages_pages"`);
    await queryRunner.query(`DROP TABLE "words_pages_pages"`);
    await queryRunner.query(`ALTER TABLE "temporary_words_pages_pages" RENAME TO "words_pages_pages"`);
    await queryRunner.query(`CREATE INDEX "IDX_761033390be011703f0e981319" ON "words_pages_pages" ("pagesPage") `);
    await queryRunner.query(`CREATE INDEX "IDX_410b97389f40639f46df44a95c" ON "words_pages_pages" ("wordsId") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_410b97389f40639f46df44a95c"`);
    await queryRunner.query(`DROP INDEX "IDX_761033390be011703f0e981319"`);
    await queryRunner.query(`ALTER TABLE "words_pages_pages" RENAME TO "temporary_words_pages_pages"`);
    await queryRunner.query(`CREATE TABLE "words_pages_pages" ("wordsId" varchar NOT NULL, "pagesPage" integer NOT NULL, PRIMARY KEY ("wordsId", "pagesPage"))`);
    await queryRunner.query(`INSERT INTO "words_pages_pages"("wordsId", "pagesPage") SELECT "wordsId", "pagesPage" FROM "temporary_words_pages_pages"`);
    await queryRunner.query(`DROP TABLE "temporary_words_pages_pages"`);
    await queryRunner.query(`CREATE INDEX "IDX_410b97389f40639f46df44a95c" ON "words_pages_pages" ("wordsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_761033390be011703f0e981319" ON "words_pages_pages" ("pagesPage") `);
    await queryRunner.query(`ALTER TABLE "changes_history" RENAME TO "temporary_changes_history"`);
    await queryRunner.query(`CREATE TABLE "changes_history" ("id" varchar PRIMARY KEY NOT NULL, "word_id" varchar NOT NULL, "created_by" varchar NOT NULL, "vocable" varchar NOT NULL, "language" varchar NOT NULL, "type" varchar NOT NULL, "meaning" varchar NOT NULL, "about" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "seeToo" varchar NOT NULL, CONSTRAINT "FK_eb2105759f0408e3bd530458a86" FOREIGN KEY ("word_id") REFERENCES "words" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "changes_history"("id", "word_id", "created_by", "vocable", "language", "type", "meaning", "about", "createdAt", "seeToo") SELECT "id", "word_id", "created_by", "vocable", "language", "type", "meaning", "about", "createdAt", "seeToo" FROM "temporary_changes_history"`);
    await queryRunner.query(`DROP TABLE "temporary_changes_history"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
    await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "email" varchar NOT NULL, "user_name" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
    await queryRunner.query(`INSERT INTO "users"("id", "created_at", "email", "user_name", "password") SELECT "id", "created_at", "email", "user_name", "password" FROM "temporary_users"`);
    await queryRunner.query(`DROP TABLE "temporary_users"`);
    await queryRunner.query(`ALTER TABLE "pages" RENAME TO "temporary_pages"`);
    await queryRunner.query(`CREATE TABLE "pages" ("page" integer PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL, "created_by" varchar, CONSTRAINT "UQ_d60215c3b81238826895da4bf11" UNIQUE ("page"), CONSTRAINT "FK_064ab67bb29a28d073db287fc6d" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "pages"("page", "created_at", "created_by") SELECT "page", "created_at", "created_by" FROM "temporary_pages"`);
    await queryRunner.query(`DROP TABLE "temporary_pages"`);
    await queryRunner.query(`DROP INDEX "IDX_410b97389f40639f46df44a95c"`);
    await queryRunner.query(`DROP INDEX "IDX_761033390be011703f0e981319"`);
    await queryRunner.query(`ALTER TABLE "words_pages_pages" RENAME TO "temporary_words_pages_pages"`);
    await queryRunner.query(`CREATE TABLE "words_pages_pages" ("wordsId" varchar NOT NULL, "pagesPage" integer NOT NULL, CONSTRAINT "FK_761033390be011703f0e9813199" FOREIGN KEY ("pagesPage") REFERENCES "pages" ("page") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("wordsId", "pagesPage"))`);
    await queryRunner.query(`INSERT INTO "words_pages_pages"("wordsId", "pagesPage") SELECT "wordsId", "pagesPage" FROM "temporary_words_pages_pages"`);
    await queryRunner.query(`DROP TABLE "temporary_words_pages_pages"`);
    await queryRunner.query(`CREATE INDEX "IDX_410b97389f40639f46df44a95c" ON "words_pages_pages" ("wordsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_761033390be011703f0e981319" ON "words_pages_pages" ("pagesPage") `);
    await queryRunner.query(`ALTER TABLE "pages" RENAME TO "temporary_pages"`);
    await queryRunner.query(`CREATE TABLE "pages" ("page" integer PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL, "created_by" varchar, CONSTRAINT "UQ_d60215c3b81238826895da4bf11" UNIQUE ("page"), CONSTRAINT "FK_064ab67bb29a28d073db287fc6d" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`INSERT INTO "pages"("page", "created_at", "created_by") SELECT "page", "created_at", "created_by" FROM "temporary_pages"`);
    await queryRunner.query(`DROP TABLE "temporary_pages"`);
  }

}
