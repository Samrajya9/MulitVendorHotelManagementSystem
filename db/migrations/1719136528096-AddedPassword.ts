import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPassword1719136528096 implements MigrationInterface {
    name = 'AddedPassword1719136528096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
