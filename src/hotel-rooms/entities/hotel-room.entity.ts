import { Hotels } from "src/hotels/entities/hotel.entity";
import { BaseEntity } from "src/utilities/entity-utils";
import { Column, Decimal128, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name:"HotelRooms"})
export class HotelRooms extends BaseEntity {

    @Column()
    hotel_id:number;

    @Column()
    name:string;

    @Column()
    status:string;

    @Column('decimal', { precision: 10, scale: 2 }) // Use decimal type for price
    price: number;

    @ManyToOne(() => Hotels, hotel => hotel.rooms, { onDelete: "CASCADE" }) // Added cascade on delete
    @JoinColumn({ name: 'hotel_id' })
    hotel:Hotels

}
