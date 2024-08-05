import { Exclude } from 'class-transformer';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';

@Entity({ name: 'HotelEmployees' })
@Unique(["email"])  // Corrected this line
export class HotelEmployees extends BaseEntity {
  
  @Column()
  hotel_id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  join_date: Date;

  @ManyToOne(() => Hotels, hotel => hotel.employees, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;
}
