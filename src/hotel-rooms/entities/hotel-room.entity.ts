import { HotelReservation } from 'src/hotel-reservation/entities/hotel-reservation.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'HotelRooms' })
export class HotelRooms extends BaseEntity {
  @Column()
  hotel_id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 }) // Use decimal type for price
  price: number;

  @ManyToOne(() => Hotels, (hotel) => hotel.rooms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;

  @OneToMany(() => HotelReservation, (reservation) => reservation.room)
  reservations: HotelReservation[]; // Note the singular `reservation` instead of `reservations`
}
