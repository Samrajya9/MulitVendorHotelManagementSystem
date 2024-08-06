import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

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
}
