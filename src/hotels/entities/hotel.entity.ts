import { Exclude } from 'class-transformer';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'Hotels' })
export class Hotels extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;
  
  @OneToMany(() => HotelEmployees, employee => employee.hotel)
  employees: HotelEmployees[];
}
