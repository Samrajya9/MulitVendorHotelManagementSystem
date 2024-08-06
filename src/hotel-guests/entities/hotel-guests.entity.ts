import { BaseEntity } from "src/utilities/entity-utils";
import { Column, Entity } from "typeorm";

@Entity({name:"HotelGuests"})
export class HotelGuests extends BaseEntity{
    @Column()
    name:string;
    @Column()
    address:string;
    @Column()
    phone:string;
}