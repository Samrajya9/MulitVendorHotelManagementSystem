import { Hotels } from 'src/hotels/entities/hotel.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'HotelTransactions' })
export class HotelTransaction extends BaseEntity {
  @Column()
  hotel_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  payment_method: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => Hotels, (hotel) => hotel.transactions)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels;
}
