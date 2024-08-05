import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedunqToHotelEmployee1722831881291 implements MigrationInterface {
    name = 'AddedunqToHotelEmployee1722831881291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" ADD CONSTRAINT "UQ_893e67cd700e06996e0a4d6adea" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" DROP CONSTRAINT "UQ_893e67cd700e06996e0a4d6adea"`);
    }

}
