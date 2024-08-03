import { MigrationInterface, QueryRunner } from "typeorm";

export class HotelEmployessCreated1722576625016 implements MigrationInterface {
    name = 'HotelEmployessCreated1722576625016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "HotelEmployees" ("id" SERIAL NOT NULL, "hotel_id" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "join_date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_893e67cd700e06996e0a4d6adea" UNIQUE ("email"), CONSTRAINT "PK_880a61ec92b58f5a582a65068fd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "HotelEmployees"`);
    }

}
