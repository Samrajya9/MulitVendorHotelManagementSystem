import { MigrationInterface, QueryRunner } from "typeorm";

export class HotelTableCreated1721636309374 implements MigrationInterface {
    name = 'HotelTableCreated1721636309374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Hotels" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_56eb626d556628b1b8fdaf020d7" UNIQUE ("email"), CONSTRAINT "PK_8adc460473aeb825873ea6eeea6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Hotels"`);
    }

}
