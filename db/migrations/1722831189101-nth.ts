import { MigrationInterface, QueryRunner } from "typeorm";

export class Nth1722831189101 implements MigrationInterface {
    name = 'Nth1722831189101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" DROP CONSTRAINT "FK_665fc6788d2bcc0a225c7614516"`);
        await queryRunner.query(`ALTER TABLE "HotelEmployees" DROP CONSTRAINT "UQ_f8588cd5578aec30d61f8fe1ebc"`);
        await queryRunner.query(`ALTER TABLE "HotelEmployees" ADD CONSTRAINT "FK_665fc6788d2bcc0a225c7614516" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelEmployees" DROP CONSTRAINT "FK_665fc6788d2bcc0a225c7614516"`);
        await queryRunner.query(`ALTER TABLE "HotelEmployees" ADD CONSTRAINT "UQ_f8588cd5578aec30d61f8fe1ebc" UNIQUE ("hotel_id", "email")`);
        await queryRunner.query(`ALTER TABLE "HotelEmployees" ADD CONSTRAINT "FK_665fc6788d2bcc0a225c7614516" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
