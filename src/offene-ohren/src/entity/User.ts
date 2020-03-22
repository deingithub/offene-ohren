import { Entity, PrimaryGeneratedColumn, Generated, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid: Number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 10_000 })
    iterations: number;

    @Column()
    salt: string;

    @Column()
    nick: string;

    @Column()
    bio: string;

    @Column({
        default: false,
    })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    apiToken: string;
}