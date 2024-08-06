import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedHotelGuests1722866822710 implements MigrationInterface {
    name = 'AddedHotelGuests1722866822710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "HotelGuests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_9d2e498cfeef37f0e2520019a4a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "HotelGuests"`);
    }

}
