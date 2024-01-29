import { CommonEntity } from "src/common/common.entity";
import { Entity, Column } from "typeorm";

@Entity({name:'categories'})
export class Category extends CommonEntity {
    @Column()
    name: string;

    @Column()
    description: string;

}
