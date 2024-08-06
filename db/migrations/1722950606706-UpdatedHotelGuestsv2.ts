import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedHotelGuestsv21722950606706 implements MigrationInterface {
    name = 'UpdatedHotelGuestsv21722950606706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP CONSTRAINT "FK_c5b9b4fca22dd2bf41cb4ea5a5c"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" RENAME COLUMN "hotelId" TO "hotel_id"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ALTER COLUMN "hotel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD CONSTRAINT "FK_70dce02ccde88f835094300e8f8" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP CONSTRAINT "FK_70dce02ccde88f835094300e8f8"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ALTER COLUMN "hotel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" RENAME COLUMN "hotel_id" TO "hotelId"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD CONSTRAINT "FK_c5b9b4fca22dd2bf41cb4ea5a5c" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}