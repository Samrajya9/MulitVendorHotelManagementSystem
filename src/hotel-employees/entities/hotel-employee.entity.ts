import { Exclude } from 'class-transformer';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'HotelEmployees' })
export class HotelEmployees extends BaseEntity {
  
  @Column()
  hotel_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  join_date: Date;

  @ManyToOne(() => Hotels, hotel => hotel.employees)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;
} 
