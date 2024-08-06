import { HotelGuests } from 'src/hotel-guests/entities/hotel-guests.entity';
import { HotelRooms } from 'src/hotel-rooms/entities/hotel-room.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'HotelReservation' })
export class HotelReservation extends BaseEntity {
  @Column()
  hotel_id: number;

  @Column()
  guest_id: number;

  @Column()
  room_id: number;

  @Column()
  check_in_date: Date;

  @Column()
  check_out_date: Date;

  @ManyToOne(() => Hotels, (hotel) => hotel.reservations)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;

  @ManyToOne(() => HotelRooms, (room) => room.reservations)
  @JoinColumn({ name: 'room_id' })
  room: HotelRooms; // Note the singular `room` instead of `rooms`

  @ManyToOne(() => HotelGuests, (guest) => guest.reservations)
  @JoinColumn({ name: 'guest_id' })
  guest: HotelGuests; // Note the singular `guest` instead of `guests`
}
