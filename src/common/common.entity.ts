import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CommonEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'timestamp',
        name:"created_at",
        default:new Date()
    })
    createdAt:Date;

    @Column({
        type:'timestamp',
        name:"updated_at",
        default:null
    })

    updatedAt:Date;
}

