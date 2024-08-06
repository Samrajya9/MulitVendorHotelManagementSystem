import { HotelReservation } from 'src/hotel-reservation/entities/hotel-reservation.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'HotelGuests' })
export class HotelGuests extends BaseEntity {
  @Column()
  hotel_id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => Hotels, (hotel) => hotel.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;

  @OneToMany(() => HotelReservation, (reservation) => reservation.guest)
  reservations: HotelReservation[]; // Note the singular `reservation` instead of `reservations`
}
