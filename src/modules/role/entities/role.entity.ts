import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "../../user/entities";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    description: string;

    @ManyToMany((type) => User, (user) => user.roles)
    @JoinColumn()
    users: User[];

    @Column({ type: 'varchar', default: 'ACTIVO', length:8 })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}