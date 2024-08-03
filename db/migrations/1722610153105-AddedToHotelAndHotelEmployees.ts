import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedToHotelAndHotelEmployees1722610153105 implements MigrationInterface {
    name = 'AddedToHotelAndHotelEmployees1722610153105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" ADD CONSTRAINT "FK_665fc6788d2bcc0a225c7614516" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" DROP CONSTRAINT "FK_665fc6788d2bcc0a225c7614516"`);
    }

}
