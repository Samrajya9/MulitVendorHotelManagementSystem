import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHotelGuestv11722952308331 implements MigrationInterface {
    name = 'UpdateHotelGuestv11722952308331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP CONSTRAINT "FK_70dce02ccde88f835094300e8f8"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ALTER COLUMN "hotel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD CONSTRAINT "FK_70dce02ccde88f835094300e8f8" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelGuests" DROP CONSTRAINT "FK_70dce02ccde88f835094300e8f8"`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ALTER COLUMN "hotel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "HotelGuests" ADD CONSTRAINT "FK_70dce02ccde88f835094300e8f8" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
