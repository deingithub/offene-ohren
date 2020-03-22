import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Helper } from "./Helper";
import { ContactKind } from "../index";

// A single contact option for a Helper.
@Entity()
export class HelperContact {
    @ManyToOne(type => Helper, { primary: true })
    @JoinColumn()
    helper: Helper;

    @Column()
    kind: ContactKind;

    @Column()
    data: string;
}