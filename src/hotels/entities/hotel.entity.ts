import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/utilities/entity-utils';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Hotels' })
export class Hotels extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;
}
