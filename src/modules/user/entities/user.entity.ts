import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Role } from "../../../modules/role/entities";
import { Tuit } from "../../../modules/tuit/entities";
import { UserDetails } from "./user.details.entity";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ type: 'varchar', nullable: false })
    email: string;
 
    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @OneToOne((type) => UserDetails, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: 'detail_id' })
    details: UserDetails;
    
    @ManyToMany((type) => Role, (role) => role.users, { eager: true })
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @Column({ type: 'varchar', default: 'ACTIVO', length:8 })
    status: string;

    @OneToMany((type) => Tuit, (tuit) => tuit.user)
    tuits: Tuit[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}