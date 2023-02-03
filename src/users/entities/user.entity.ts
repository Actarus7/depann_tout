import { Exclude } from 'class-transformer';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  e_mail: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  adress_line1: string;

  @Column({ type: 'varchar', nullable: true })
  adress_line2: string;

  @Column({ type: 'varchar', nullable: true })
  adress_line3: string;

  @Column({ type: 'varchar' })
  zipCode: string;

  @Column({ type: 'varchar' })
  city: string;

  @OneToMany(() => Service, (service) => service.user)
  services: Service[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
