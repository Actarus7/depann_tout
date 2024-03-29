import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('services')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'character varying' })
  city: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'boolean', default: false })
  reserved: boolean;

  @ManyToOne(() => User, (user) => user.services)
  user: User;
}
