import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedHotelGuests1722950438145 implements MigrationInterface {
    name = 'UpdatedHotelGuests1722950438145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD "hotelId" integer`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD CONSTRAINT "FK_c5b9b4fca22dd2bf41cb4ea5a5c" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP CONSTRAINT "FK_c5b9b4fca22dd2bf41cb4ea5a5c"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP COLUMN "hotelId"`);
    }

}
