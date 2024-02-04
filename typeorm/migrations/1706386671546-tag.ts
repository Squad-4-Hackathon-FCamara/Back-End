import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tag1706386671546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "tag"`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Back End')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Front End')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('DevOps')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('UI/UX')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Design')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('IA')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Mobile')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Soft Skill')`);
    await queryRunner.query(`INSERT INTO Tag("tagName") values ('Data Science')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
