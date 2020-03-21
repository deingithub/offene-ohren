import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { User } from "./User";

// Data on talks that have occurred. Until the helper has rated
// their experience, the relevant field is null.
@Entity()
export class Talk {
    @PrimaryGeneratedColumn()
    uid: Number;

    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    helper: User;

    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    requester: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    positiveForRequester: boolean;

    @Column({ nullable: true })
    positiveForHelper: boolean;
}