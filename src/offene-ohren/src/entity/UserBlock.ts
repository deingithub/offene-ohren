import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

// A user block prevents the blocked user from contacting the blocking user,
// and vice-versa.
@Entity()
export class UserBlock {
    @ManyToOne(type => User, { primary: true })
    @JoinColumn()
    user: User;

    @ManyToOne(type => User, { primary: true })
    @JoinColumn()
    blocked: User;
}