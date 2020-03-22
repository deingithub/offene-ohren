import { Entity, PrimaryGeneratedColumn, Generated, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid: Number;

    @Column()
    email: string;

    @Column()
    password: string;

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

    @Generated("uuid")
    @Column()
    apiToken: string;
}