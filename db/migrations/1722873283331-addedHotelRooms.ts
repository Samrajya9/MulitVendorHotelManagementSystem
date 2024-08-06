import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedHotelRooms1722873283331 implements MigrationInterface {
    name = 'AddedHotelRooms1722873283331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "HotelRooms" ("id" SERIAL NOT NULL, "hotel_id" integer NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_c6d8f0f3ea82b394b521ee6d95b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "HotelRooms" ADD CONSTRAINT "FK_c4a627300edbc1cf8526a618028" FOREIGN KEY ("hotel_id") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "HotelRooms" DROP CONSTRAINT "FK_c4a627300edbc1cf8526a618028"`);
        await queryRunner.query(`DROP TABLE "HotelRooms"`);
    }

}
