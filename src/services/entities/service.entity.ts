import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying' })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'character varying' })
  city: string;

  @Column({ type: 'timestamp with local time zone' })
  start_time: Date;

  @Column({ type: 'timestamp with local time zone' })
  end_time: Date;

  @Column({ type: 'boolean', default: false })
  reserved: boolean;
}
