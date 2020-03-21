import { Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";

// A user block prevents the blocked user from contacting the blocking user,
// and vice-versa.
@Entity()
export class UserBlock {
    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    user: User;

    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    blocked: User;
}