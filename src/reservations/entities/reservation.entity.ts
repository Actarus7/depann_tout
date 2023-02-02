import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('reservations')
export class Reservation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    numero: number;

    @OneToOne(() => Service)
    @JoinColumn()
    service: Service;

    @ManyToOne(() => User, user => user.reservations)
    user: User;

};
