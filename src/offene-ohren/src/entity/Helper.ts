import { Entity, OneToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";
import { CWTopics } from "../index";

// A helper user's data. Logins handled by `User`.
@Entity()
export class Helper {
    @OneToOne(type => User, { primary: true })
    @JoinColumn()
    user: User;

    @Column()
    qualifications: string;

    @Column("simple-array")
    filters: CWTopics[];

    @Column({ default: false })
    isInCall: boolean;
}