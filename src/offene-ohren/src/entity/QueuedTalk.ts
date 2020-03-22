import { Entity, JoinColumn, Column, ManyToOne, OneToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Helper } from "./Helper";
import { CWTopics } from "../index";

// A queued request for a talk. When a helper accepts, set `acceptedBy`.
@Entity()
export class QueuedTalk {
    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    requester: User;

    @Column("simple-array")
    cws: CWTopics[];

    @Column()
    severity: Number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => Helper, { nullable: true })
    @JoinColumn()
    acceptedBy: Helper;
}