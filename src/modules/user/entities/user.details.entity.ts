import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_details')
export class UserDetails{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastname: string;

    @Column({ type: 'varchar', unique: true, length: 8, nullable: true })
    dni: string;

    @Column({ type: 'varchar', default: 'ACTIVO', length:8 })
    status: string;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updateAt: Date;
}