import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity } from 'typeorm';

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
}
